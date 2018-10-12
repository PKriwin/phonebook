import req from 'superagent'

import config from '../../config.json'

const apiUrl = config.apiUrl

console.log(app)

const api = {}

api.search = (terms) => {

  return req.get(apiUrl + '/persons/search')
            .query({
              firstname: terms,
              lastname: terms,
              telephone: terms
            }).then(res => res.body)
}

api.getPerson = (id) => {

  return req.get(apiUrl + '/persons/' + id)
            .then(res => res.body)
}

api.createPerson = (values) => {

  return req.post(apiUrl + '/persons')
            .send(values)
            .then(res => res.statusCode == 204)
}

api.updatePerson = (id, values) => {

  return req.patch(apiUrl + '/persons/' + id)
            .send(values)
            .then(res => res.statusCode == 204)
}

export default api
