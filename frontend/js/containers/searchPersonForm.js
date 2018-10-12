
import React, { Component } from 'react'

import api from '../business/api'
import TextField from '../components/textField'
import PersonsTable from '../components/personsTable'

const persons = [
  {
    id: 1,
    firstname: 'john',
    lastname: 'smith',
    telephone: '+32 45 543234'
  },{
    id: 2,
    firstname: 'todd',
    lastname: 'smith',
    telephone: '+32 45 543234'
  },{
    id: 3,
    firstname: 'jim',
    lastname: 'smith',
    telephone: '+32 45 543234'
  },{
    id: 4,
    firstname: 'joe',
    lastname: 'smith',
    telephone: '+32 45 543234'
  }
]


export default class SearchPersonForm extends Component {

    constructor(props) {

        super(props)

        this.state = { searchTherms: '', personList: [] }
        this.search = this.search.bind(this)
    }

    search(terms) {

      if (terms.value) {

        api.searchPerson(terms.value).then(personss => {

          this.setState({
            searchTherms: this.state.searchTherms,
            personList: personss
          })
        })

      } else {

        this.setState({
          searchTherms: this.state.searchTherms,
          personList: []
        })
      }
    }

    render() {
        return (
          <div className="section">
            <div className="container is-fluid">
              <TextField
                value={this.state.searchTherms}
                onChange={this.search}
                label='Search Person'
                placeholder=''
                validation={/.*/}/>
            </div>
            {
              this.state.personList.length > 0 ?
                <div className="section">
                  <PersonsTable persons={this.state.personList}/>
                </div> : null
            }
        </div>
      )
    }
}
