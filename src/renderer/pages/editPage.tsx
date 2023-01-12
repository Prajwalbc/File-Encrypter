import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './editPage.css';

export default function EditPage() {
  const { state } = useLocation();
  const { file } = state;

  const [isEncryptedFile, setIsEncryptedFile] = useState(false);
  const [oldFilePath, setOldFilePath] = useState('');
  const [fileInfo, setFileInfo] = useState({ path: '', name: '', data: '' });
  const [password, setPassword] = useState('');

  async function getFileData(filePath: string) {
    const fileData = await window.electron.getFileData(filePath);
    if (file.path.lastIndexOf('.encrypted') !== -1) {
      setIsEncryptedFile(true);
    } else {
      setIsEncryptedFile(false);
    }
    setOldFilePath(file.path);
    setFileInfo({ path: file.path, name: file.name, data: fileData });
  }
  useEffect(() => {
    getFileData(file.path);
  }, []);

  async function handleDecryptBtn(e: any) {
    e.preventDefault();
    if (
      password !== '' &&
      fileInfo.data !== '' &&
      fileInfo.path.lastIndexOf('.encrypted') !== -1
    ) {
      try {
        const bytes = CryptoJS.AES.decrypt(fileInfo.data, password);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        if (decryptedData !== '') {
          setFileInfo({
            path: fileInfo.path.slice(
              0,
              fileInfo.path.lastIndexOf('.encrypted')
            ),
            name: fileInfo.name.slice(
              0,
              fileInfo.name.lastIndexOf('.encrypted')
            ),
            data: decryptedData,
          });
          setPassword('');
          setIsEncryptedFile(false);
          toast.success('Successfully decrypted');
        } else {
          toast.error('wrong password');
          // console.log('wrong password');
        }
      } catch (e) {
        console.log(e, 'wrong password');
        toast.error('wrong password');
      }
    } else {
      if (password === '') toast.info('Enter valid password');
      else if (fileInfo.data === '') toast.info('File is empty');
      console.log('Enter valid password or this file is already decrypted');
    }
  }

  async function handleEncryptBtn(e: any) {
    e.preventDefault();
    if (
      password !== '' &&
      fileInfo.data !== '' &&
      !fileInfo.name.includes('.encrypted')
    ) {
      const encryptedData = CryptoJS.AES.encrypt(
        fileInfo.data,
        password
      ).toString();
      setFileInfo({
        path: fileInfo.path + '.encrypted',
        name: fileInfo.name + '.encrypted',
        data: encryptedData,
      });
      setPassword('');
      setIsEncryptedFile(true);
      toast.success('Successfully Encrypted');
    } else {
      if (password === '') toast.info('Enter valid password');
      else if (fileInfo.data === '') toast.info('File is empty');
      // console.log('Enter valid password or this file is already encrypted');
    }
  }

  async function handleSaveBtn(e: any) {
    e.preventDefault();
    if (oldFilePath === fileInfo.path) {
      await window.electron.saveFile(fileInfo.path, fileInfo.data);
    } else {
      await window.electron.saveFileRenamed(
        oldFilePath,
        fileInfo.path,
        fileInfo.data
      );
      setOldFilePath(fileInfo.path);
    }
    toast.success('File saved');
    // console.log('File saved');
  }

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  const onDataChange = (e: any) => {
    setFileInfo({ ...fileInfo, data: e.target.value });
  };

  return (
    <div>
      <div className="header">
        <Link className="back-icon" to="/">
          <img
            src={require('../../../assets/back-icon.png')}
            alt="back_icon"
            className="img-icons back-icon"
          />
        </Link>
        <h2>{fileInfo.name}</h2>
        <button onClick={(e) => handleSaveBtn(e)}>Save</button>
      </div>
      <div className="edit-container">
        <textarea
          disabled={isEncryptedFile || false}
          value={fileInfo.data || ''}
          className="text-area"
          spellCheck={false}
          onChange={(e) => onDataChange(e)}
        ></textarea>

        <div className="bottom">
          <input
            value={password || ''}
            type="text"
            placeholder="Encryption Password"
            name=""
            onChange={(e) => onPasswordChange(e)}
          />
          {isEncryptedFile ? (
            <button onClick={(e) => handleDecryptBtn(e)}>Decrypt</button>
          ) : (
            <button onClick={(e) => handleEncryptBtn(e)}>Encrypt</button>
          )}
        </div>
      </div>
    </div>
  );
}
