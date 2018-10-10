'use strict'

const path = require('path')
const Sequelize = require('sequelize')

module.exports = class SequelizeDbAdapter {

  constructor(options) {

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

    this.models = { person: personModel }
  }
}
