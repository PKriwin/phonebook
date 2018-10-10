'use strict'

const Joi = require('joi')

exports.getPersonById = {

  validate: {
    params: {
      id: Joi.number().integer().positive().required().description('id of the person')
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

exports.searchPerson = async (request, h) => {

}

exports.updatePerson = async (request, h) => {


}

exports.createPerson = async (request, h) => {

}
