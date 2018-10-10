'use strict'

const Chai   = require('chai');

before(async() => {

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
