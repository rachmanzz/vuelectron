const path = require('path')
const url = require('url')
global._CONTROL_ACCESS_$$ = {} // register global control broadcaster
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

global.Views = (Vs) => {
  return url.format({
          pathname: path.join(__dirname, 'Views/'+ Vs +'.html'),
          protocol: 'file:',
          slashes: true
      })
}
module.exports = {
  window : {width: 1000, height: 600, frame: true },
  run: (win) => {
    win.loadURL(Views('Index'))
  }
}
