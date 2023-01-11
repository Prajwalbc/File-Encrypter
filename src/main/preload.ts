import { contextBridge, ipcRenderer } from 'electron';

// export type Channels = 'file-handle';

const electronHandler = {
  getFileData: (path: string) => ipcRenderer.invoke('get-file-data', path),
  saveFile: (path: string, data: string) =>
    ipcRenderer.invoke('save-file', path, data),
  saveFileRenamed: (oldPath: string, newPath: string, data: string) =>
    ipcRenderer.invoke('save-file-renamed', oldPath, newPath, data),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
