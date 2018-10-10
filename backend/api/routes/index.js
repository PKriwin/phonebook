'use strict'

const path     = require("path")
const handlers = require(path.join(path.dirname(__dirname), 'handlers'))

module.exports = {

    name: 'routes',
    version: '1.0.0',
    register: async (server, options) => {

      server.route([
        {
          method: 'GET',
          path: '/persons/{id}',
          config: handlers.persons.getPersonById
        }, {
            method: 'PATCH',
            path: '/persons/{id}',
            config: handlers.persons.updatePerson
        }, {
            method: 'GET',
            path: '/persons/search',
            config: handlers.persons.searchPerson
        },{
            method: 'POST',
            path: '/persons',
            config: handlers.persons.createPerson
        },
      ])
    }
}
