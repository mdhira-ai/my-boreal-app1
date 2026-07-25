const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("node:path");
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

// --- Add logging so you can actually see what's happening ---
log.transports.file.level = 'info';
autoUpdater.logger = log;
let win;

const createWindow = () => {
  win = new BrowserWindow({
    icon: path.join(__dirname, 'favicon.ico'),
    width: 500,
    height: 400,

    webPreferences: {
      preload: path.join(__dirname, "./preload/preload.js"),
    },
    roundedCorners: true,
    autoHideMenuBar: true,
    maximizable: false,
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  autoUpdater.checkForUpdatesAndNotify();
});


// --- Add these so you can see every stage of the update process ---
autoUpdater.on('checking-for-update', () => {
  log.info('Checking for update...');
});
autoUpdater.on('update-available', async(info) => {
  log.info('Update available:', info.version);
  await dialog.showMessageBox(win, {
    type: 'info',
    title: 'Update available',
    message: String(`Update available: ${info.version} 
      \n please restart the app`),
    buttons: ['OK']
  });
});
autoUpdater.on('update-not-available', () => {
  log.info('No update available (already on latest version)');
});
autoUpdater.on('error', (err) => {
  log.error('Update error:', err);
});
autoUpdater.on('download-progress', (progress) => {
  log.info(`Download progress: ${progress.percent.toFixed(1)}%`);
});
autoUpdater.on('update-downloaded', () => {
  log.info('Update downloaded, will install on quit');
});

ipcMain.handle("app:get-version", () => {
  return app.getVersion();
});



// for alert
ipcMain.handle('show-alert', async (event, message) => {
  // const webContents = event.sender;
  // const win = BrowserWindow.fromWebContents(webContents);

  // Attaching 'win' makes it a modal sheet and safely handles focus
  await dialog.showMessageBox(win, {
    type: 'info',
    title: 'Alert',
    message: String(message),
    buttons: ['OK']
  });
});