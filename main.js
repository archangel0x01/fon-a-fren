const { app, BrowserWindow, globalShortcut } = require('electron');

let mainWindow;
let showWindow = true;

function showMainWindow() {
  mainWindow.show();
  showWindow = true;
}

function hideMainWindow() {
  mainWindow.hide();
  showWindow = false;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    },
    frame: true,
    transparent: false,
    alwaysOnTop: true,
    paintWhenInitiallyHidden: true,
    contentProtection: true,
    type: 'toolbar',
    show: true,
    movable: true,
    resizable: true,
    opacity: 0.6
  });

  // Load Telegram Web
  mainWindow.loadURL('https://web.telegram.org/k/');
  
  // Restore original window properties
  mainWindow.setContentProtection(true);
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.setAlwaysOnTop(true, 'screen-saver', 1);
  
  // Ctrl+Shift+W => Hide/Show window
  globalShortcut.register('CommandOrControl+Shift+W', () => {
    if (showWindow) {
      hideMainWindow();
    } else {
      showMainWindow();
    }
  });
     
  // Ctrl+Shift+Q => Quit the application
  globalShortcut.register('CommandOrControl+Shift+Q', () => {
    console.log("Quitting application...");
    app.quit();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
