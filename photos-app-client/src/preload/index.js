import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
const { ipcRenderer } = require('electron');
const os = require('os');
const fs = require('fs');
const path = require('path');

contextBridge.exposeInMainWorld('electronAPI', {
  saveImage: (filePath, arrayBuffer) => {
    const buffer = Buffer.from(arrayBuffer);
    ipcRenderer.send('save-image', filePath, buffer);
  },

  getHomeDir: () => os.homedir(),

  mkdir: (dirPath) => fs.mkdirSync(dirPath, { recursive: true }),

  deleteImage: (filePath) => {
    const fsPath = filePath.replace(/^file:\/\//, '');
    if (fs.existsSync(fsPath)) {
      fs.unlinkSync(fsPath);
    }
  },

  getSavedImages: () => {
    const userHome = os.homedir();
    const folderPath = path.join(userHome, 'EditlyImages');

    try {
      if (!fs.existsSync(folderPath)) {
        return [];
      }

      const files = fs.readdirSync(folderPath);

      return files
        .filter(file => /\.(jpe?g|png|gif)$/i.test(file))
        .map(file => {
          const filePath = path.join(folderPath, file);
          const stats = fs.statSync(filePath);
          const buffer = fs.readFileSync(filePath);
          const base64 = buffer.toString('base64');

          const ext = path.extname(file).toLowerCase();
          const mime = ext === '.png' ? 'image/png'
                     : ext === '.gif' ? 'image/gif'
                     : 'image/jpeg';

          const formattedDate = new Date(stats.mtime).toLocaleDateString('en-GB');

          return {
            path: `data:${mime};base64,${base64}`,
            name: path.parse(file).name,
            date: formattedDate,
            realPath: filePath // ✅ actual file path for deletion
          };
        });
    } catch (err) {
      console.error("Error reading image folder:", err);
      return [];
    }
  },

  saveImageWithNewName: (filename, buffer) => {
    const userHome = os.homedir();
    const dirPath = path.join(userHome, 'EditlyImages');
    const filePath = path.join(dirPath, filename);
    fs.writeFileSync(filePath, Buffer.from(buffer));
  }
});

const api = {};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
