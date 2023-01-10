import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

// export type Channels = 'file-handle';

const electronHandler = {
  getFileData: (path: string) => ipcRenderer.invoke('get-file-data', path),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
