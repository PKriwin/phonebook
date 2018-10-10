'use strict'

const _ = require('lodash')

module.exports.create = (sequelize, datatypes) => {

  const personModel = createSequelizeModel(sequelize, datatypes)

  return {

    search:   getModelSearchMethod(personModel, sequelize),
    findById: getModelFindByIdMethod(personModel),
    update:   getModelUpdateMethod(personModel),
    create:   getModelCreateMethod(personModel),
    delete:   getModelDeleteMethod(personModel)
  }
}

function createSequelizeModel(sequelize, datatypes) {

  return sequelize.define('person', {

      firstname : {
          type: datatypes.TEXT,
          allowNull: false
      },
      lastname: {
          type: datatypes.TEXT,
          allowNull: false,
      },
      telephone: {
          type: datatypes.TEXT,
          allowNull: false
      }
  }, {
      tableName: 'person',
      freezeTableName: true
  })
}

function getModelSearchMethod(personModel, sequelize) {

  return async (fieldsAndValues) => {

    const Op = sequelize.Op;
    const where = { [Op.or]: [] }

    _.forOwn(fieldsAndValues, (value, key) => {
      where[Op.or].push({ [key] : { [Op.like]: '%' + value +'%'} })
    })

    return personModel.findAll({ where })
  }
}

function getModelFindByIdMethod(personModel) {

  return async (id) => {

    return await (personModel.findById(id))
  }
}

function getModelUpdateMethod(personModel) {

  return async (id, values) => {

    const modelToUpdate = await personModel.findById(id)

    _.forOwn(values, (value, key) => modelToUpdate[key] = value)

    await (modelToUpdate.save())
  }
}

function getModelCreateMethod(personModel) {

  return async(values) => {

    await personModel.create(values)
  }
}

function getModelDeleteMethod(personModel) {

  return async (id) => {

    await personModel.destroy({
      where: {
        id
      }
    })
  }
}
