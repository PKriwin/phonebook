'use strict';

const path      = require('path')
const routes    = require(path.join(path.dirname(__dirname), 'routes'))
const dbAdapter = require(path.join(path.dirname(__dirname), 'database'))
const Hapi      = require('hapi')
const _         = require('lodash')


exports.start = async () => {

  const server = Hapi.server({
      port: 3000,
      host: 'localhost'
  })

  await initServer(server)
  await startServer(server)
}

async function initServer(server) {

  await server.register(routes);
  await server.register(dbAdapter);
}

async function startServer(server) {

  try {

    server.start()
    console.log(`Server running at: ${server.info.uri}`);
  }
  catch(err) {

    console.log(err);
    process.exit(1);
  }
}
