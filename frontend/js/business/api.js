import req from 'superagent'

const apiUrl = 'http://localhost:3000'

const api = {}

api.search = (terms) => {

  return req.get(apiUrl + '/persons/search')
            .query({
              firstname: terms,
              lastname: terms,
              telephone: terms
            }).then(res => res.body)
}

api.createPerson = (values) => {

  return req.post(apiUrl + '/persons')
            .send(values)
            .then(res => res.body)
}

api.updatePerson = (id, values) => {

  return req.patch(apiUrl + '/persons/' + id)
            .send(values)
            .then(res => res.body)
}

export default api
