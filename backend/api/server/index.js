'use strict';

const path      = require('path')
const Hapi      = require('hapi')
const _         = require('lodash')

module.exports = class Server {

  constructor(options) {

    this.server = Hapi.server({
        port: options.port,
        host: options.host,
        routes: {
          cors: true
        }
    })
    this.dbAdapter = options.dbAdapter
    this.routes = options.routes
  }

  async init() {

    await registerDbAdapter(this.server, this.dbAdapter)
    await registerRoutes(this.server, this.routes);
  }

  async start() {

    try {

      this.server.start()
      console.log(`Server running at: ${this.server.info.uri}`);
    }
    catch(err) {

      console.log(err);
      process.exit(1);
    }
  }

  async inject(options) {

    return await (this.server.inject(options))
  }
}

async function registerDbAdapter(server, dbAdapter) {

  await server.register({
      name: 'dbAdapter',
      register: async (server, options) => {

        server.app.dbAdapter = dbAdapter
      }
    });
}

async function registerRoutes(server, routes) {

  server.register({
      name: 'routes',
      register: async (server, options) => {

        server.route(routes)
      }
  })
}
