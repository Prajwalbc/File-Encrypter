import { contextBridge, ipcRenderer } from 'electron';

// export type Channels = 'file-handle';

const electronHandler = {
  getFileData: (path: string) => ipcRenderer.invoke('get-file-data', path),
  encryptFile: (path: string, password: string, data: string) =>
    ipcRenderer.invoke('encrypt-file', path, password, data),
  decryptFile: (path: string, password: string, data: string) =>
    ipcRenderer.invoke('decrypt-file', path, password, data),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
