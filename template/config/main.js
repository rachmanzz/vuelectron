const Start = require('../start')
const Route = Gets('App:Route')
const {app, BrowserWindow, Menu} = require('electron')

const main = () => {
  var win = new BrowserWindow(Start.window)
  Start.run(win)
  win.webContents.on('did-finish-load', () => {
    Route(win)
  })
}
app.on('ready', main)
