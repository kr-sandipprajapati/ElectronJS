const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const handleSetTitle = (event , title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }
    })
    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    ipcMain.on('set-title', handleSetTitle)
    createWindow()
    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () =>{
    if(process.platform !== 'darwin') app.quit()
})
