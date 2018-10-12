'use strict'

const path = require('path')
const Sequelize = require('sequelize')

module.exports = class SequelizeDbAdapter {

  constructor(options) {

    const sequelizeInstance = new Sequelize(
          options.dbName,
          options.dbUsername,
          options.dbPassword,
          {
              host     : options.dbHost,
              dialect  : options.dbDialect,
              storage  : options.dbStorage || null,
              define   : { timestamps: false, paranoid: false },
              logging  : options.dbLogging == 'true' ? console.log : false,
              operatorsAliases: false

          });
    const personModel = require(path.join(__dirname, 'models', 'person.js'))
                            .create(sequelizeInstance, Sequelize.DataTypes)

    this.models = { person: personModel }
  }
}
