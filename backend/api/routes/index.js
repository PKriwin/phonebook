'use strict'

const path     = require("path")
const handlers = require(path.join(path.dirname(__dirname), 'handlers'))

module.exports = {
    name: 'routes',
    version: '1.0.0',
    register: async function (server, options) {

      server.route([
        {
          method: 'GET',
          path: '/',
          handler: handlers.getHelloWorld
        }
      ])
    }
}
