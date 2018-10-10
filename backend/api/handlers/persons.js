'use strict'

const Joi = require('joi')
const _   = require('lodash')

exports.getPersonById = {

  validate: {
    params: {
      id: Joi.number().integer().positive().required()
    }
  },
  handler:  async (request, h) => {

    const personModel = request.server.app.dbAdapter.models.person
    const requestedPerson = await personModel.findById(request.params.id)
    const response = requestedPerson ?
      h.response(requestedPerson) : h.response({ code: 404, err_msg:'Unkown person'}).code(404)

    return response
  }
}

exports.updatePerson = {

  validate: {

    params: {
      id: Joi.number().integer().positive().required().description('id of the person')
    },
    payload: Joi.object().keys({
        firstname: Joi.string(),
        lastname: Joi.string(),
        telephone: Joi.string().regex(/\+\d{2,}\s\d{2,}\s\d{6,}/)
    }).or('firstname', 'lastname', 'telephone')
  },
  handler:  async (request, h) => {

    const personModel = request.server.app.dbAdapter.models.person
    const personToUpdate = await personModel.findById(request.params.id)
    let response

    if (personToUpdate) {

      await personModel.update(personToUpdate.id, request.payload)
      response = h.response().code(204)

    } else {

      response = h.response({ code: 404, err_msg: 'unknown person'}).code(404)
    }

    return response
  }
}

exports.searchPerson = {

  validate: {
    query: Joi.object().keys({
        firstname: Joi.string(),
        lastname: Joi.string(),
        telephone: Joi.string()
    }).or('firstname', 'lastname', 'telephone')
  },
  handler:  async (request, h) => {

    const personModel = request.server.app.dbAdapter.models.person

    return h.response(await personModel.search(request.query))
  }
}

exports.createPerson = {

  validate: {
    payload: {
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        telephone: Joi.string().regex(/\+\d{2,}\s\d{2,}\s\d{6,}/).required()
      }
    },
    handler:  async (request, h) => {

      const personModel = request.server.app.dbAdapter.models.person

      await personModel.create(request.payload)

      return h.response().code(204)
    }
}
