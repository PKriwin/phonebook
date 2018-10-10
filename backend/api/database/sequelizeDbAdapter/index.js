'use strict'

const path = require('path')
const Sequelize = require('sequelize');
const options = {
  DB_NAME: 'test',
  DB_USERNAME: 'user',
  DB_PASSWORD: 'pswd',
  DB_HOST: 'localhost',
  DB_DIALECT: 'sqlite',
  DB_STORAGE: './test.db',
  DB_LOGGING: console.log
}
const sequelizeInstance = new Sequelize(
      options.DB_NAME,
      options.DB_USERNAME,
      options.DB_PASSWORD,
      {
          host     : options.DB_HOST,
          dialect  : options.DB_DIALECT,
          storage  : options.DB_STORAGE || null,
          define   : { timestamps: false, paranoid: false },
          logging  : options.DB_LOGGING,
          operatorsAliases: false

      });
const personModel = require(path.join(__dirname, 'models', 'person.js'))
                        .create(sequelizeInstance, Sequelize.DataTypes)

const dbAdapter = { models: { person: personModel }}

module.exports = {

    name: 'dbAdapter',
    version: '1.0.0',
    register: async function (server, options) {

      server.app.dbAdapter = dbAdapter
    }
}
