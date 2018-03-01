const ipc = require('electron').ipcMain
const control = _CONTROL_ACCESS_$$
class Broadcaster {
  constructor (){}
  setWindow (win) {
      this.win = win
  }
  get (on, callback) {
    ipc.on(on, (ev, data) => {
      // ev = event
      if (typeof callback !== 'undefined' && typeof callback === 'string') {
        if (/[\w\/_]+\.[\w\/_]+/.test(callback)) {
          const fileExp = callback.match(/([\w\/_]+)\.([\w\/_]+)/i)
          // fileExp[1] -> control file or dirname and file
          if (typeof control[fileExp[1]] === 'undefined') {
            // Call require file of control
            const Modules = require(
              './Controls/' + fileExp[1]
            )
            // register filename to control object -> control[filename] = module instance
            control[fileExp[1]] = new Modules(this.win)
          }
          // control[filename] require for call module instance, and [fileExp[2]] to call require method
          control[fileExp[1]][fileExp[2]](ev, data) // call method
          return
        }
      } else {
        typeof callback !== 'undefined' && typeof callback === 'function' && callback(ev, data)
      }
    })
  }
}

module.exports = Broadcaster
