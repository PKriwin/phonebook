import React, { Component } from 'react'

import api from '../business/api'
import PersonInfosForm from '../components/personInfosForm'
import ConfirmOrCancelButtonGroup from '../components/confirmOrCancelButtonGroup'

export default class createPersonForm extends Component {

    constructor(props) {

        super(props)

        this.state = {confimEnabled: false, dispCreatedMsg: false}

        this.onInfosChangedHandler = this.onInfosChangedHandler.bind(this)
        this.confirmHandler = this.confirmHandler.bind(this)
    }

    onInfosChangedHandler(infos) {

        this.setState({confimEnabled: infos.isValid, values: infos.values})
    }

    confirmHandler() {

      api.createPerson(this.state.values)
        .then(created => {

          if (created)
            this.setState({
              confimEnabled: this.state.confimEnabled,
              values: this.state.values,
              dispCreatedMsg: true
            })

        })
    }

    render() {
        return (
          <div className="section">
            <h2 className="title title-is-2">Create person</h2>
            <PersonInfosForm
              values={{}}
              onInfosChanged={this.onInfosChangedHandler}
              />
              <ConfirmOrCancelButtonGroup
                confimEnabled={this.state.confimEnabled}
                onConfirm={this.confirmHandler}
                onCancel={() => console.log('CANCEL')}/>
                {
                  this.state.dispCreatedMsg ?

                    <div className="container-fluid has-text-centered">
                      <p className='has-text-success'>New person successfuly created</p>
                    </div>

                    : null
                }
          </div>
        )
    }
}
