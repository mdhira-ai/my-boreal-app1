const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const { autoUpdater } = require('electron-updater');


const createWindow = () => {
  const win = new BrowserWindow({
    icon: path.join(__dirname, 'favicon.ico'),
    width: 500,
    height: 400,

    webPreferences: {
      preload: path.join(__dirname, "./preload/preload.js"),
    },
    roundedCorners: true,
    autoHideMenuBar:true,
    maximizable: false,
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

   autoUpdater.checkForUpdatesAndNotify();
});

ipcMain.handle("app:get-version", () => {
  return app.getVersion();
});
