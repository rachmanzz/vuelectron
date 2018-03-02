const Datastore = require('nedb')

module.exports = class Datastore {
    constructor(files) {
        const db = typeof files !== 'undefined' ? new Datastore({ filename: files }) : new Datastore()
        db.loadDatabase(err => {if(err) throw err})
        this.db = db
        this.whereis = {}
    }

    data (mdata) {
        this.mdata = mdata
    }

    insert (callback) {
        this.db.insert(this.mdata, (err, result) => {
            callback(!err, result)
        })
    }
    reset () {
        this.whereis = {}
    }
    where(key, arg, data) {
        if (typeof data !== 'undefined') {
            if (arg === '<') this.whereis[key] = {$lt: data}
            if (arg === '>') this.whereis[key] = {$gt: data}
            if (arg === '<=') this.whereis[key] = {$lte: data}
            if (arg === '>=') this.whereis[key] = {$gte: data}
            if (arg === 'in') this.whereis[key] = {$in: data}
            if (arg === 'notin') this.whereis[key] = {$nin: data}
            if (arg === 'not') this.whereis[key] = {$ne: data}
            if (arg === 'exists') this.whereis[key] = {$exists: data}
            if (arg === 'regex') this.whereis[key] = {$regex: data}
            return
        }
        this.whereis[key] = arg
    }
    get (callback) {
        db.find(this.whereis, (err, data) => {
            callback(!err, data)
            this.reset()
        })
    }
    getAll (callback) {
        db.find({}, (err, data) => {
            callback(!err, data)
            this.reset()
        })
    }

    getOne (callback) {
        db.findOne(this.whereis, (err, data) => {
            callback(!err, data)
            this.reset()
        })
    }
    raw () {
        return this.db
    }

}