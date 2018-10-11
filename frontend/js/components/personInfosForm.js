import React, { Component } from 'react'

import TextField from './textField'
import _ from 'lodash'

const VALIDATIONS = {

  firstname: /\w+/,
  lastname: /\w+/,
  telephone: /\+\d{2,}\s\d{2,}\s\d{6,}/
}

export default class PersonInfosForm extends Component {

    constructor(props) {

        super(props)

        this.state = _.reduce(['firstname', 'lastname', 'telephone'], (res, info) => {

          res[info] = {
            value: this.props.values[info],
            isValid: this.props.values[info] ?
              this.props.values[info].match(VALIDATIONS[info]) !== null : false
          }

          return res

        }, {})

        this.areFieldsValid = this.areFieldsValid.bind(this)
        this.fieldChangedHandler = this.fieldChangedHandler.bind(this)
    }

    fieldChangedHandler(fieldName, field) {

      const newState = _.clone(this.state)

      newState[fieldName].isValid = field.isValid;
      newState[fieldName].value = field.value;

      this.setState(newState)

      this.props.onInfosChanged({

          isValid: this.areFieldsValid(),
          values: {
            firstname: this.state.firstname.value,
            lastname: this.state.lastname.value,
            telephone: this.state.telephone.value,
          }
      })
    }

    areFieldsValid() {
      return this.state.firstname.isValid && this.state.lastname.isValid
        && this.state.telephone.isValid
    }

    render() {
        return (
            <div className="container is-fluid">
              <TextField
                  value={this.props.values.firstname}
                  onChange={(field) => this.fieldChangedHandler('firstname', field)}
                  label='Firstname'
                  placeholder=''
                  validation={VALIDATIONS.firstname}
                  errMsg={"firstname cannot be empty or contain only special characters"}/>
              <TextField
                  value={this.props.values.lastname}
                  onChange={(field) => this.fieldChangedHandler('lastname', field)}
                  label='Lastname'
                  placeholder=''
                  validation={VALIDATIONS.lastname}
                  errMsg={"lastname cannot be empty or contain only special characters"}/>
              <TextField
                  value={this.props.values.telephone}
                  onChange={(field) => this.fieldChangedHandler('telephone', field)}
                  label='Telephone'
                  placeholder=''
                  validation={VALIDATIONS.telephone}
                  errMsg={"Must be of form: +32 34 323453 (plus sign, space, group of digits, space, group of digits with at least 6 digits )"}/>
            </div>
        )
    }
  }
