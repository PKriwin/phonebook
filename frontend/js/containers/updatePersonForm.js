import React, { Component } from 'react'

import PersonInfosForm from '../components/personInfosForm'

export default class UpdatePersonForm extends Component {

    constructor(props) {

        super(props)

        this.onInfosChangedHandler = this.onInfosChangedHandler.bind(this)
    }

    onInfosChangedHandler(infos) {
console.log(infos)
      //this.setState({confirmEnabled: infos.isValid, values: infos.values})
      if(infos.isValid)
        console.log('valid')
      else
        console.log('invalid')
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
          </div>
        )
    }
}
