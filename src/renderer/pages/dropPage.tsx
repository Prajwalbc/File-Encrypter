import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie-player';
import upload_lottie_svg from '../../../assets/upload-icon.json';
import './dropPage.css';

export default function DropPage() {
  let file: File | undefined;

  const [dragHover, setDragHover] = useState(false);

  const browseFile = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  function handleInputOnChange(this: any, e: any) {
    e.preventDefault();
    file = browseFile.current?.files![0]; //selecting only the first one if multiple is provided
    if (file !== undefined) {
      processFile(file);
    }
  }

  async function processFile(file: File) {
    let fileType: string | undefined = file?.type;
    let validExtensions = ['text/plain'];

    if (validExtensions.includes(fileType)) {
      let fileData = await window.electron.getFileData(file.path);
      navigate('/edit', {
        state: { fileName: file.name, filePath: file.path, fileData: fileData },
      });
    } else {
      console.log(false, 'only .txt supported');
      setDragHover(false);
    }
  }

  function handleOnDragOver(e: any) {
    e.preventDefault();
    setDragHover(true);
  }
  function handleOnDragLeave(e: any) {
    e.preventDefault();
    setDragHover(false);
  }
  function handleOnDrop(e: any) {
    e.preventDefault();
    file = e.dataTransfer.files[0];
    if (file !== undefined) {
      processFile(file);
    }
  }

  return (
    <div>
      <h2 className="heading">
        "Select the file you'd like to encrypt/decrypt"
      </h2>

      <div className="container">
        <div
          className={`drag-area ${dragHover ? 'active' : ''}`}
          onDragOver={(e) => handleOnDragOver(e)}
          onDragLeave={(e) => handleOnDragLeave(e)}
          onDrop={(e) => handleOnDrop(e)}
        >
          <Lottie
            className="upload-lottie"
            loop
            animationData={upload_lottie_svg}
            play
            style={{ width: 150, height: 150 }}
          />
          <header>
            {dragHover ? 'Release' : 'Drag & Drop'} file or{' '}
            <button onClick={(e) => browseFile!.current!.click()}>
              Browse File
            </button>
          </header>
          <p>support type: txt</p>
          <input
            ref={browseFile}
            onChange={(e) => handleInputOnChange(e)}
            type="file"
            hidden
          />
        </div>
      </div>
    </div>
  );
}
