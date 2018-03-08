const path = require('path')
const url = require('url')
global._CONTROL_ACCESS_$$ = {} // register global control
global.Gets = (Im) => {
  const regex = /([\w]+):([-\w/]+)/
    if (!regex.test(Im)) {
        return require(Im)
    }
    const exp = Im.match(regex)
    const base = exp[1]
    const file = exp[2]
    const fullUrl = './' + base + '/' + file
    return require(fullUrl)
}
const app = Gets('config:app')
global.Views = (Vs) => {
  return url.format({ pathname: path.join(__dirname, app.rootview + '/' + Vs + '.html'), protocol: 'file:', slashes: true })
}
module.exports = { window : app.window, run: (win) => { win.loadURL(Views(app.index)) }}
