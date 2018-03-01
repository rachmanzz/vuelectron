const fs = require('fs')
const Ug = require("uglify-es")
const rimraf = require('rimraf')
const fse = require('fs-extra')

const controls = function () {
    copydir.sync('./App/Controls', './publish/App/Controls')
    fse.copy('./App/Controls', './publish/App/Controls')
    .then(() => console.log('copying control resource'))
    .catch(err => console.error(err))
}
const app = function () {
    fs.mkdir('./publish/App', function (err) {
        if (err) throw err;
        fs.writeFileSync("./publish/App/Broadcaster.js", Ug.minify({
            "file1.js": fs.readFileSync("./App/Broadcaster.js", "utf8")
        }).code, "utf8")
        fs.writeFileSync("./publish/App/Route.js", Ug.minify({
            "Route.js": fs.readFileSync("./App/Route.js", "utf8")
        }).code, "utf8")
    })
    fs.access('./App/Controls', function (err) {
        if (err) return;
        controls()
    })
}
const configFile = function() {
    fs.mkdir('./publish/config', function (err) {
        if (err) throw err;
        fs.writeFileSync('./publish/config/main.js', Ug.minify({
            "Route.js": fs.readFileSync('./config/main.js', "utf8")
        }).code, "utf8")
    })
}
const extract = function () {
    // app
    app()
    //config
    configFile()

    fs.writeFileSync('./publish/start.js', Ug.minify({
        "Route.js": fs.readFileSync('./start.js', "utf8")
    }).code, "utf8")

    // copy views file
    fse.copy('./views', './publish/views')
    .then(() => console.log('copying views resource'))
    .catch(err => console.error(err))

    fse.copy('./package.json', './publish/package.json')
    .then(() => console.log('copying package resource'))
    .catch(err => console.error(err))
}

const maker = function (err) {
    if (err) throw err;
    extract()
    fse.copy('./node_modules', './publish/node_modules')
    .then(() => console.log('copying node_modules'))
    .catch(err => console.error(err))

}
const create = function () {
    fs.mkdir('./publish', maker)
}


fs.access('./publish', function (err) {
    if (err) {
        create()
        return
    }

    rimraf('./publish', function () {
        create()
    })
})
