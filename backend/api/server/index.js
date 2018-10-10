'use strict';

const path      = require('path')
const Hapi      = require('hapi')
const _         = require('lodash')

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
})

exports.init = async (routes, dbAdapter) => {

  await registerDbAdapter(dbAdapter)
  await registerRoutes(routes);
}

async function registerDbAdapter(dbAdapter) {

  await server.register({
      name: 'dbAdapter',
      register: async (server, options) => {

        server.app.dbAdapter = dbAdapter
      }
    });
}

async function registerRoutes(routes) {

  server.register({
      name: 'routes',
      register: async (server, options) => {

        server.route(routes)
      }
  })
}

exports.start = async () => {

  try {

    server.start()
    console.log(`Server running at: ${server.info.uri}`);
  }
  catch(err) {

    console.log(err);
    process.exit(1);
  }
}
