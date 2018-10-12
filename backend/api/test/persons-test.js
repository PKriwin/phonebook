'use strict'

const path = require('path')
const Chai   = require('chai');
const expect = Chai.expect;
const SequelizeDbAdapter = require(path.join(path.dirname(__dirname), 'database', 'sequelizeDbAdapter'))
const routes = require(path.join(path.dirname(__dirname), 'routes'))
const ApiServer = require(path.join(path.dirname(__dirname), 'server'))

const dbAdapterOptions = {
  dbName: 'test',
  dbUsername: 'user',
  dbPassword: 'pswd',
  dbHost: 'localhost',
  dbDialect: 'sqlite',
  dbStorage: path.join(__dirname, 'test.db'),
  dbLogging: "false"
}
const dbAdapter = new SequelizeDbAdapter(dbAdapterOptions)
const personModel = dbAdapter.models.person

const testServer = new ApiServer({
   port: 3000,
   host: 'localhost',
   dbAdapter: new SequelizeDbAdapter(dbAdapterOptions),
   routes: routes
})

before(async() => {

  await testServer.init()
})

describe(' --- Person resource --- ', () => {

  describe('GET: /persons/{id}', () => {

    it ('Should return 200 - existing person', async () => {

      await personModel.flush()

      const newPerson = await personModel.create({
        id: 1,
        firstname: 'john',
        lastname: 'smith',
        telephone: '+32 34 654372'
      })
      const req = { method: 'GET', url: '/persons/1' }
      const resp = await testServer.inject(req)
      const payload = JSON.parse(resp.payload || {})

      expect(resp.statusCode).to.equal(200)
      expect(payload.id).to.equal(1)
      expect(payload.firstname).to.equal('john')
      expect(payload.lastname).to.equal('smith')
      expect(payload.telephone).to.equal('+32 34 654372')
    })

    it ('Should return 404 - unknown person', async () => {

      await personModel.flush()

      const req = { method: 'GET', url: '/persons/108' }
      const resp = await testServer.inject(req)

      expect(resp.statusCode).to.equal(404)
    })
  })

  describe('GET: /persons/search', () => {

    it ('Should return 200 - matching search', async () => {

      await personModel.flush()

      await personModel.create({
        id: 1,
        firstname: 'john',
        lastname: 'smith',
        telephone: '+32 34 654332'
      })
      await personModel.create({
        id: 2,
        firstname: 'tom',
        lastname: 'henry',
        telephone: '+32 34 654372'
      })
      await personModel.create({
        id: 3,
        firstname: 'janice',
        lastname: 'jones',
        telephone: '+33 34 654372'
      })

      const req = { method: 'GET', url: '/persons/search?firstname=j&telephone=33' }
      const resp = await testServer.inject(req)
      const payload = JSON.parse(resp.payload || {})

      expect(resp.statusCode).to.equal(200)
      expect(payload.length).to.equal(2)
    })

    it ('Should return 200 - unmatching search', async () => {

      await personModel.flush()

      const req = { method: 'GET', url: '/persons/search?firstname=j' }
      const resp = await testServer.inject(req)
      const payload = JSON.parse(resp.payload || {})

      expect(resp.statusCode).to.equal(200)
      expect(payload.length).to.equal(0)
    })

    it ('Should return 400 - invalid query param', async () => {

      await personModel.flush()

      const req = { method: 'GET', url: '/persons/search?email=jo' }
      const resp = await testServer.inject(req)

      expect(resp.statusCode).to.equal(400)
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

      expect(resp.statusCode).to.equal(204)
      expect(records.length).to.equal(1)
      expect(records[0].firstname).to.equal('john')
      expect(records[0].lastname).to.equal('smith')
      expect(records[0].telephone).to.equal('+32 37 654372')
    })


    it ('Should return 400 - invalid new person (unknown field)', async () => {

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

      expect(resp.statusCode).to.equal(400)
      expect(records.length).to.equal(0)
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

      expect(resp.statusCode).to.equal(400)
      expect(records.length).to.equal(0)
    })

    it ('Should return 400 - invalid new person (erroneous telephone number)', async () => {

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

      expect(resp.statusCode).to.equal(400)
      expect(records.length).to.equal(0)
    })

  })

  describe('PATCH: /persons/{id}', () => {

    it ('Should return 204 - valid update', async () => {

      await personModel.flush()

      const newPerson = await personModel.create({
        id: 1,
        firstname: 'john',
        lastname: 'smith',
        telephone: '+32 87 654372'
      })
      const req = {
        method: 'PATCH',
        url: '/persons/1',
        payload: {
          firstname: 'michel',
          telephone: '+65 98 654132',
        }
      }
      const resp = await testServer.inject(req)
      const records = await personModel.findAll()

      expect(resp.statusCode).to.equal(204)
      expect(records[0].firstname).to.equal('michel')
      expect(records[0].lastname).to.equal('smith')
      expect(records[0].telephone).to.equal('+65 98 654132')
    })

    it ('Should return 404 - unknown person', async () => {

      await personModel.flush()

      const req = {
        method: 'PATCH',
        url: '/persons/10',
        payload: {
          firstname: 'joey',
          telephone: '+65 98 654132',
        }
      }
      const resp = await testServer.inject(req)

      expect(resp.statusCode).to.equal(404)
    })

    it ('Should return 400 - invalid update (unknown field)', async () => {

      await personModel.flush()

      const newPerson = await personModel.create({
        id: 1,
        firstname: 'john',
        lastname: 'smith',
        telephone: '+32 34 654372'
      })
      const req = {
        method: 'PATCH',
        url: '/persons/1',
        payload: {
          firstname: 'michel',
          email: 'mich@gmail.com',
        }
      }
      const resp = await testServer.inject(req)
      const records = await personModel.findAll()

      expect(resp.statusCode).to.equal(400)
      expect(records[0].firstname).to.equal('john')
      expect(records[0].lastname).to.equal('smith')
      expect(records[0].telephone).to.equal('+32 34 654372')
    })

    it ('Should return 400 - invalid patch (malformed telephone number)', async () => {

      await personModel.flush()

      const newPerson = await personModel.create({
        id: 1,
        firstname: 'john',
        lastname: 'smith',
        telephone: '+32 34 654372'
      })
      const req = {
        method: 'PATCH',
        url: '/persons/1',
        payload: {
          firstname: 'michel',
          telephone: '32 3 454 32145',
        }
      }
      const resp = await testServer.inject(req)
      const records = await personModel.findAll()

      expect(resp.statusCode).to.equal(400)
      expect(records[0].firstname).to.equal('john')
      expect(records[0].lastname).to.equal('smith')
      expect(records[0].telephone).to.equal('+32 34 654372')
    })
  })
})
