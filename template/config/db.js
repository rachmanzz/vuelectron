const DataStore = Gets('libraries:nedb')
const db = '../database/data.db'
module.exports = new DataStore(/* your file database : db */)