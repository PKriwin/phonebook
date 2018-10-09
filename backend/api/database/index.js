'use strict'

const path      = require("path")
const dbAdapter = require(path.join(__dirname, 'sequelizeDbAdapter'))

module.exports = {
    name: 'dbAdapter',
    version: '1.0.0',
    register: async function (server, options) {

      server.app.dbAdapter = dbAdapter
    }
}
