'use strict';

const Hapi  = require('hapi');
const Inert = require('inert')

const config = require('./config.json')
const server = new Hapi.Server({
  port: config.port,
  host: config.host,
  routes: {
    cors: true
  }
})

initAndStartServer()

async function initAndStartServer() {

  await server.register(Inert)

  server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
         directory: {
             path: config.frontend_dir_path
         }
     }
  })

  server.start()
  console.log(`Asset server running at: ${server.info.uri}`)
}
