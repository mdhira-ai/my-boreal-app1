const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

// --- Add logging so you can actually see what's happening ---
log.transports.file.level = 'info';
autoUpdater.logger = log;

const createWindow = () => {
  const win = new BrowserWindow({
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
autoUpdater.on('update-available', (info) => {
  log.info('Update available:', info.version);
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
ipcMain.handle("app:get-version", () => {
  return app.getVersion();
});
