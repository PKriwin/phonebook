'use strict'

const path = require("path")
const routes    = require(path.join(__dirname, 'routes'))
const dbAdapter = require(path.join(__dirname, 'database', 'sequelizeDbAdapter'))
const apiServer = require(path.join(__dirname, 'server'))

const options = {
  DB_NAME: 'test',
  DB_USERNAME: 'user',
  DB_PASSWORD: 'pswd',
  DB_HOST: 'localhost',
  DB_DIALECT: 'sqlite',
  DB_STORAGE: './test.db',
  DB_LOGGING: console.log
}

async function main () {

  await apiServer.init(await dbAdapter.init(options), routes)
  await apiServer.start()
}

main()
