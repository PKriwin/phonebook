'use strict'

const path = require("path")
const handlers = require(path.join(path.dirname(__dirname), 'handlers'))

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: handlers.getHelloWorld
  }
]
