'use strict'

const path = require("path")
const routes    = require(path.join(__dirname, 'routes'))
const dbAdapter = require(path.join(__dirname, 'database', 'sequelizeDbAdapter'))
const ApiServer = require(path.join(__dirname, 'server'))

const options = {
  DB_NAME: 'test',
  DB_USERNAME: 'user',
  DB_PASSWORD: 'pswd',
  DB_HOST: 'localhost',
  DB_DIALECT: 'sqlite',
  DB_STORAGE: '/Users/blakewilton/Downloads/test.db',
  DB_LOGGING: console.log
}

async function main () {

  const apiServer = new ApiServer({
     port: 3000,
     host: 'localhost',
     dbAdapter: new dbAdapter(options),
     routes: routes
  })

  await apiServer.init()
  await apiServer.start()
}

main()
