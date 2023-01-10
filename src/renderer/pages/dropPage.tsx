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
    file = browseFile.current?.files![0]; // selecting only the first one if multiple is provided
    if (file !== undefined) {
      processFile(file);
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

  async function processFile(file: File) {
    const fileType: string | undefined = file?.type;
    const validExtensions = ['text/plain'];

    if (validExtensions.includes(fileType)) {
      navigate('/edit', {
        state: { file: file },
      });
    } else {
      console.log(false, 'only .txt supported');
      setDragHover(false);
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
