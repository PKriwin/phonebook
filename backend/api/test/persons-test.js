'use strict'

const Chai   = require('chai');
const SequelizeDbAdapter = require(path.join(path.dirname(__dirname), 'database', sequelizeDbAdapter))
const routes = require(path.join(path.dirname(__dirname), 'routes'))
const testServer = require(path.join(path.dirname(__dirname), 'server'))

const dbAdapterOptions = {
  DB_NAME: 'test',
  DB_USERNAME: 'user',
  DB_PASSWORD: 'pswd',
  DB_HOST: 'localhost',
  DB_DIALECT: 'sqlite',
  DB_STORAGE: './test.db',
  DB_LOGGING: false
}
const dbAdapter = new SequelizeDbAdapter(options)
const personModel = dbAdapter.models.person

before(async() => {

  await personModel.flush()
  await apiServer.init(dbAdapter, routes)
})

describe(' --- Person resource --- ', () => {

  describe('GET: /persons/{id}', () => {

    it ('Should return 204 - existing person', async (() => {
      
    })

    it ('Should return 404 - unknown person', async (() => {

    })
  })

  describe('GET: /persons/search', () => {

    it ('Should return 204 - matching search', async (() => {

    })

    it ('Should return 204 - unmatching search', async (() => {

    })

    it ('Should return 404 - invalid query param', async (() => {

    })
  })

  describe('POST: /persons/', () => {

    it ('Should return 204 - valid new person', async (() => {

    })

    it ('Should return 400 - invalid new person (missing or unknown field)', async (() => {

    })

    it ('Should return 400 - invalid new person (malformed telephone number)', async (() => {

    })

  })

  describe('PATCH: /persons/{id}', () => {

    it ('Should return 204 - valid update', async (() => {

    })

    it ('Should return 404 - unknown person', async (() => {

    })

    it ('Should return 400 - invalid update (missing or unknown field)', async (() => {

    })

    it ('Should return 400 - invalid patch (malformed telephone number)', async (() => {

    })
  })
})
