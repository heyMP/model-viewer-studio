const {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  Menu,
  shell,
  ipcRenderer,
  url
} = require("electron");
const cp = require("child_process");
const getPort = require("get-port");

// Track the open child processes
let childProcesses = []

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile("src/index.html");

  // Open the DevTools.
  win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("open-file", async e => {
  const availablePort = await getPort();
  const file = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "HTML", extensions: ["html"] }]
  });
  if (file.filePaths[0]) {
    // start server
    const spawn = cp.spawn('./node_modules/.bin/mvstudio', [file.filePaths[0]])
    spawn.stdout.on('data', async (data) => {
      console.log(`stdout: ${data}`);
    });
    let win = new BrowserWindow({ title: 'asdf', width: 800, height: 600 })
    win.on('closed', () => {
      spawn.kill()
      win = null
    });
    win.loadURL('http://localhost:3000');
    // win.loadFile(file.filePaths[0])
    // win.loadURL(url.format({
    //   pathname: `http://localhost:3000`,
    //   protocol: 'file:',
    //   slashes: true,
    // }));
  }
});
