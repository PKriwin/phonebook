'use strict';

const path  = require('path')
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
    path: '/dist/{param*}',
    handler: {
      directory: {
        path: path.join(config.frontend_dir_path, 'dist')
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      file: {
        path: path.join(config.frontend_dir_path, 'index.html'),
        confine: false
      }
    }
  })

  server.start()
  console.log(`Asset server running at: ${server.info.uri}`)
}
