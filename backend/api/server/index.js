'use strict';

const path      = require('path')
const Hapi      = require('hapi')
const _         = require('lodash')

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
})

exports.init = async (routes, dbAdapter) => {

  await server.register(dbAdapter);
  await server.register(routes);
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
