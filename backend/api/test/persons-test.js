'use strict'

const path = require('path')
const Chai   = require('chai');
const expect = Chai.expect;
const SequelizeDbAdapter = require(path.join(path.dirname(__dirname), 'database', 'sequelizeDbAdapter'))
const routes = require(path.join(path.dirname(__dirname), 'routes'))
const testServer = require(path.join(path.dirname(__dirname), 'server'))

const dbAdapterOptions = {
  DB_NAME: 'test',
  DB_USERNAME: 'user',
  DB_PASSWORD: 'pswd',
  DB_HOST: 'localhost',
  DB_DIALECT: 'sqlite',
  DB_STORAGE: '../test.db',
  DB_LOGGING: false
}
const dbAdapter = new SequelizeDbAdapter(dbAdapterOptions)
const personModel = dbAdapter.models.person

before(async() => {

  await testServer.init(routes, dbAdapter)
})

describe(' --- Person resource --- ', () => {

  describe('GET: /persons/{id}', () => {

    it ('Should return 204 - existing person', async () => {

      await personModel.flush()

      const newPerson = await personModel.create({
        id: 1,
        firstname: 'john',
        lastname: 'smith',
        telephone: '+32 34 87 654372'
      })
      const req = { method: 'GET', url: '/persons/1' }
      const resp = await testServer.inject(req)

      expect(resp.statusCode).to.equal(200);
      expect(resp.payload.id === 1)
      expect(resp.payload.firstname === 'john')
      expect(resp.payload.lastname === 'smith')
      expect(resp.payload.lastname === '+32 34 87 654372')
    })

    it ('Should return 404 - unknown person', async () => {

      await personModel.flush()

      const req = { method: 'GET', url: '/persons/108' }
      const resp = await testServer.inject(req)

      expect(resp.statusCode).to.equal(404);
    })
  })

  describe('GET: /persons/search', () => {

    it ('Should return 204 - matching search', async () => {

    })

    it ('Should return 204 - unmatching search', async () => {

    })

    it ('Should return 404 - invalid query param', async () => {

    })
  })

  describe('POST: /persons', () => {

    it ('Should return 204 - valid new person', async () => {

      await personModel.flush()

      const req = {
        method: 'POST',
        url: '/persons',
        payload: {
          firstname: 'john',
          lastname: 'smith',
          telephone: '+32 37 654372'
        }
      }
      const resp = await testServer.inject(req)
      const records = await personModel.findAll()

      expect(resp.statusCode).to.equal(200);
      expect(records.length === 1)
      expect(records[0].firstname === 'john')
      expect(records[0].lastname === 'smith')
      expect(records[0].lastname === '+32 87 654372')
    })


    it ('Should return 400 - invalid new person (missing field)', async () => {

      await personModel.flush()

      const req = {
        method: 'POST',
        url: '/persons',
        payload: {
          firstname: 'john',
          lastname: 'smith',
          telephone: '+32 37 654372',
          email: 'john@smith.com'
        }
      }
      const resp = await testServer.inject(req)
      const records = await personModel.findAll()

      expect(resp.statusCode).to.equal(400);
      expect(records.length === 0)
    })

    it ('Should return 400 - invalid new person (missing field)', async () => {

      await personModel.flush()

      const req = {
        method: 'POST',
        url: '/persons',
        payload: {
          firstname: 'john',
          telephone: '+32 37 654372',
        }
      }
      const resp = await testServer.inject(req)
      const records = await personModel.findAll()

      expect(resp.statusCode).to.equal(400);
      expect(records.length === 0)
    })

    it ('Should return 400 - invalid new person (malformed telephone number)', async () => {

      await personModel.flush()

      const req = {
        method: 'POST',
        url: '/persons',
        payload: {
          firstname: 'john',
          lastname: 'smith',
          telephone: '32 37 2 654372',
        }
      }
      const resp = await testServer.inject(req)
      const records = await personModel.findAll()

      expect(resp.statusCode).to.equal(400);
      expect(records.length === 0)
    })

  })

  describe('PATCH: /persons/{id}', () => {

    it ('Should return 204 - valid update', async () => {

    })

    it ('Should return 404 - unknown person', async () => {

    })

    it ('Should return 400 - invalid update (missing or unknown field)', async () => {

    })

    it ('Should return 400 - invalid patch (malformed telephone number)', async () => {

    })
  })
})
