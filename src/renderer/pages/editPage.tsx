import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './editPage.css';

export default function EditPage() {
  const { state } = useLocation();
  const { file } = state;

  // const [isEditable, setIsEditable] = useState(false);
  const [fileInfo, setFileInfo] = useState({ path: '', name: '', data: '' });
  const [password, setPassword] = useState('');

  async function getFileData(filePath: string) {
    const fileData = await window.electron.getFileData(filePath);
    setFileInfo({ path: file.path, name: file.name, data: fileData });
  }
  useEffect(() => {
    getFileData(file.path);
  }, []);

  async function handleDecryptBtn(e: any) {
    e.preventDefault();
    if (password !== '' && fileInfo.data !== '') {
      const _data = await window.electron.decryptFile(
        file.path,
        password,
        fileInfo.data
      );
      setPassword('');
      setFileInfo({ ...fileInfo, data: _data });
    } else {
      console.log('Enter valid password');
    }
  }

  async function handleEncryptBtn(e: any) {
    e.preventDefault();
    if (password !== '' && fileInfo.data !== '') {
      const _data = await window.electron.encryptFile(
        file.path,
        password,
        fileInfo.data
      );
      setPassword('');
      setFileInfo({ ...fileInfo, data: _data });
    } else {
      console.log('Enter valid password');
    }
  }

  // function handleEditBtn(e: any) {
  //   e.preventDefault();
  // }

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
        <h2>{file.name}</h2>
        <div className="empty-div" />
        {/* <button onClick={(e) => setIsEditable(true)}>Edit</button> */}
      </div>
      <div className="edit-container">
        <textarea
          // contentEditable={false}
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
          <button onClick={(e) => handleEncryptBtn(e)}>Encrypt</button>
          <button onClick={(e) => handleDecryptBtn(e)}>Decrypt</button>
        </div>
      </div>
    </div>
  );
}
