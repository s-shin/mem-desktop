import { app, BrowserWindow } from "electron";

let mainWindow: Electron.BrowserWindow | null;

const isDevelopment = process.env.NODE_ENV !== 'production';

const setupMainWindow = () => {
  if (mainWindow != null) {
    return;
  }

  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  const win = mainWindow!;

  win.loadURL(
    isDevelopment
      ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
      : `file://${__dirname}/index.html`
  );

  if (isDevelopment) {
    win.webContents.openDevTools();
  }

  win.on("closed", () => {
    mainWindow = null;
  });

  win.webContents.on('devtools-opened', () => {
    win.focus()
    setImmediate(() => {
      win.focus()
    })
  });
};

app.on("ready", setupMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", setupMainWindow);
