
import React, { Component } from 'react'

import api from '../business/api'
import TextField from '../components/textField'
import PersonsTable from '../components/personsTable'

export default class SearchPersonForm extends Component {

    constructor(props) {

        super(props)

        this.state = { searchTherms: '', personList: [] }
        this.search = this.search.bind(this)
        this.displaySearchResults = this.displaySearchResults.bind(this)
    }

    search(terms) {

      if (terms.value) {

        api.searchPerson(terms.value).then(persons => {

          this.setState({
            searchTherms: terms.value,
            personList: persons
          })
        })

      } else {

        this.setState({
          searchTherms: terms.value,
          personList: []
        })
      }
    }

    displaySearchResults() {

      return this.state.personList.length > 0 ?
      <div className="section">
        <PersonsTable persons={this.state.personList}/>
      </div> :
      <div className='section'>
        <div className="container-fluid has-text-centered">
          <p>No results</p>
        </div>
      </div>
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
              this.state.searchTherms ?
                this.displaySearchResults() : null
            }
        </div>
      )
    }
}
