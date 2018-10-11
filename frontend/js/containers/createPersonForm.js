import React, { Component } from 'react'

import PersonInfosForm from '../components/personInfosForm'
import ConfirmOrCancelButtonGroup from '../components/confirmOrCancelButtonGroup'

export default class createPersonForm extends Component {

    constructor(props) {

        super(props)

        this.state = {confimEnabled: false}

        this.onInfosChangedHandler = this.onInfosChangedHandler.bind(this)
    }

    onInfosChangedHandler(infos) {

        this.setState({confimEnabled: infos.isValid})
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
                onConfirm={() => console.log('CONFIRM')}
                onCancel={() => console.log('CANCEL')}/>
          </div>
        )
    }
}
