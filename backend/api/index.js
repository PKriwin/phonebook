'use strict'

const path = require("path")
const routes    = require(path.join(__dirname, 'routes'))
const dbAdapter = require(path.join(__dirname, 'database', 'sequelizeDbAdapter'))
const ApiServer = require(path.join(__dirname, 'server'))
const config    = require(path.join(__dirname, 'config.json'))

async function main () {

  const apiServer = new ApiServer({
     host: config.host,
     port: parseInt(config.port),
     dbAdapter: new dbAdapter(config.dbAdapter),
     routes: routes
  })

  await apiServer.init()
  await apiServer.start()
}

main()
