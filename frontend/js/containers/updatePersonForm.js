import React, { Component } from 'react'

import api from '../business/api'
import queryString from 'query-string'
import PersonInfosForm from '../components/personInfosForm'
import ConfirmOrCancelButtonGroup from '../components/confirmOrCancelButtonGroup'

export default class UpdatePersonForm extends Component {

    componentDidMount() {

      api.getPerson(queryString.parse(this.props.location.search).id)
         .then(person => {
           this.setState({confimEnabled: true, person: person})
         })
    }

    constructor(props) {

        super(props)

        this.state = {}

        this.onInfosChangedHandler = this.onInfosChangedHandler.bind(this)
        this.confirmHandler = this.confirmHandler.bind(this)
    }

    onInfosChangedHandler(infos) {

        this.setState({confimEnabled: infos.isValid, values: infos.values})
    }

    confirmHandler() {

      api.updatePerson(queryString.parse(this.props.location.search).id, this.state.values)
        .then(updated => {

          if (updated)
            this.setState({
              confimEnabled: this.state.confimEnabled,
              values: this.state.values,
              dispCreatedMsg: true
            })

        })
    }

    render() {

      if (this.state.person) {
        return (
          <div className="section">
            <h2 className="title title-is-2">Update person infos</h2>
            <h3 className="subtitle">Person id: {this.state.person.id}</h3>
            <PersonInfosForm
              values={ this.state.person }
              onInfosChanged={this.onInfosChangedHandler}
              />
              <ConfirmOrCancelButtonGroup
                confimEnabled={this.state.confimEnabled}
                onConfirm={this.confirmHandler}/>
                {
                  this.state.dispCreatedMsg ?

                    <div className="container-fluid has-text-centered">
                      <p className='has-text-success'>Person successfuly updated</p>
                    </div>

                    : null
                }
          </div>
        )
      } else
          return (<div>Loading...</div>)
    }
}
