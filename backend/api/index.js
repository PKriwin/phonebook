'use strict'

const path = require("path")
const routes    = require(path.join(__dirname, 'routes'))
const dbAdapter = require(path.join(__dirname, 'database', 'sequelizeDbAdapter'))
const apiServer = require(path.join(__dirname, 'server'))

async function main () {

  await apiServer.init(dbAdapter, routes)
  await apiServer.start()
}

main()
