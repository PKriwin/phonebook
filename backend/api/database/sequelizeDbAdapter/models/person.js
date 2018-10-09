'use strict'

const _ = require('lodash')

module.exports.create = (sequelize) {

  const personModel = createSequelizeModel(sequelize)

  return {

      search:   getModelSearchMethod(personModel, sequelize),
      findById: getModelFindByIdMethod(personModel),
      update:   getModelUpdateMethod(personModel),
      create:   getModelCreateMethod(personModel),
      delete:   getModelDeleteMethod(personModel)
    }
  }
}

function getModelSearchMethod(personModel, sequelize) {

  return async (fieldsAndValues) => {

    const Op = Sequelize.Op;
    const where = { [Op.or]: [] }

    _.forOwn(fieldsAndValues, (value, key) => {
      where[Op.or].push({ [key] : { [Op.like]: '%' + value +'%'} })
    })

    return personModel.findAll({ where })
  }
}

function getModelFindByIdMethod(personModel) {

  return async (id) => {

    return personModel.findById(id).get({plain: true})
  }
}

function getModelUpdateMethod(personModel) {

  return async (id, values) => {

    const modelToUpdate = await personModel.findById(id)

    _.forOwn(values, (value, key) => modelToUpdate[key] = value)

    await (modelToPatch.save())
  }
}

function getModelCreateMethod(personModel) {

  return async(values) => {

    await personModel.insert(values)
  }
}

function getModelDeleteMethod(personModel) {

  return async (id) => {

    await personModel.destroy({
      where: {
        id
      })
    })
  }
}

function createSequelizeModel(sequelize) {

  return sequelize.define('person', {

      firstname : {
          type: sequelize.STRING,
          allowNull: false
      },
      lastname: {
          type: sequelize.STRING,
          allowNull: false,
      },
      telephone: {
          type: sequelize.STRING,
          allowNull: false
      }
  }, {
      tableName: 'person',
      freezeTableName: true
  })
}
