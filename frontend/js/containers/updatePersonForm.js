import React, { Component } from 'react'

import PersonInfosForm from '../components/personInfosForm'
import ConfirmOrCancelButtonGroup from '../components/confirmOrCancelButtonGroup'

export default class UpdatePersonForm extends Component {

    constructor(props) {

        super(props)

        this.state = {confimEnabled: true}

        this.onInfosChangedHandler = this.onInfosChangedHandler.bind(this)
    }

    onInfosChangedHandler(infos) {

        this.setState({confimEnabled: infos.isValid})
    }

    render() {
        return (
          <div className="section">
            <h2 className="title title-is-2">Update person infos</h2>
            <h3 className="subtitle">Person id: {this.props.person.id}</h3>
            <PersonInfosForm
              values={ this.props.person}
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
