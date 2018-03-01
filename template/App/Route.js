const Bs = require('./Broadcaster')
// defined window variable
var w
// callBroadcaster Class and make Route function
const bs = new Bs(), Route = (ws) => {
  w = ws
  bs.setWindow(ws)
}
module.exports =  Route

// routing here
