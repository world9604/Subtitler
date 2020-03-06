const {
    app,
    BrowserWindow,
    dialog,
    ipcMain,
    globalShortcut
} = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;
let subtitleWindow;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit();
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+q', () => {
        if(subtitleWindow != undefined)
            subtitleWindow.webContents.send('goLeftSubtitle');
    });
    globalShortcut.register('CommandOrControl+e', () => {
        if(subtitleWindow != undefined)
            subtitleWindow.webContents.send('goRightSubtitle');
    });
    globalShortcut.register('CommandOrControl+s', () => {
        if(subtitleWindow != undefined)
            subtitleWindow.show();
    });
    globalShortcut.register('CommandOrControl+h', () => {
        if(subtitleWindow != undefined)
            subtitleWindow.hide();
    });
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
        if(subtitleWindow != undefined)
            subtitleWindow.close();
    });

    ipcMain.on('readFile', (event) => {
        dialog.showOpenDialog(mainWindow, {
            properties: ['openFile']
        }).then(result => {

            fs.readFile(result.filePaths[0], 'utf-8', (err, data) => {
                if (err) {
                    alert("An error ocurred reading the file :" + err.message);
                    return;
                }

                event.reply('asynchronous-reply', "asynchronous-reply success!");

                let {
                    width,
                    height
                } = require('electron').screen.getPrimaryDisplay().size;

                subtitleWindow = new BrowserWindow({
                    alwaysOnTop: true,
                    width: width - 100,
                    height: 50,
                    frame: false,
                    center: false,
                    x: 50,
                    y: height - 200,
                    transparent: true,
                    webPreferences: {
                        //      preload: path.join(__dirname, 'preload.js'),
                        nodeIntegration: true,
                        offscreen: true
                    }
                });
                subtitleWindow.loadFile('./html/subtitle.html');
                subtitleWindow.webContents.on('did-finish-load', () => {
                    subtitleWindow.webContents.send('subtitleContent', data);
                });
            });
        }).catch(err => {
            console.log(err);
        });
    });
}


