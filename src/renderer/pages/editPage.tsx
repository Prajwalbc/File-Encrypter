import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './editPage.css';

export default function EditPage() {
  const { state } = useLocation();
  const { fileName, filePath, fileData } = state;

  const [updatedData, setUpdatedData] = useState(fileData);

  function handleTextUpdate(e: any) {
    setUpdatedData(e.target.value);
  }

  function handleDecryptBtn(e: any) {
    e.preventDefault();
  }

  function handleEncryptBtn(e: any) {
    e.preventDefault();
  }

  function handleSaveBtn(e: any) {
    e.preventDefault();
  }

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
        <h2>{fileName}</h2>
        <div></div>
      </div>
      <div className="edit-container">
        <textarea
          className="text-area"
          defaultValue={updatedData}
          spellCheck={false}
          onChange={(e) => handleTextUpdate(e)}
        ></textarea>
        <div className="buttons">
          {fileName.includes('.encrypted') ? (
            <button onClick={(e) => handleDecryptBtn(e)}>Decrypt</button>
          ) : (
            <button onClick={(e) => handleEncryptBtn(e)}>Encrypt</button>
          )}
          <button onClick={(e) => handleSaveBtn(e)}>Save</button>
        </div>
      </div>
    </div>
  );
}
