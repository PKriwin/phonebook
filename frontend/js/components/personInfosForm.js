import React, { Component } from 'react'

import TextField from './textField'

export default class PersonInfosForm extends Component {

    constructor(props) {

        super(props)

        this.state = {

          firstname: this.props.values.firstname.match(/\w+/),
          lastname: this.props.values.lastname.match(/\w+/),
          telephone: this.props.values.telephone.match(/\+\d{2,}\s\d{2,}\s\d{6,}/)
        }

        this.areFieldsValid = this.areFieldsValid.bind(this)
        this.fieldChanged = this.fieldChanged.bind(this)
    }

    fieldChanged(field) {

      this.state[field.fieldName] = field.isValid;

      this.setState(this.state)

      if (this.areFieldsValid())
        this.props.onValidInfos()
    }

    areFieldsValid() {
      return this.state.firstname && this.state.lastname
        && this.state.telephone
    }

    render() {
        return (
          <div className="section">
            <div className="container is-fluid">
              <TextField
                  value={this.props.values.firstname}
                  onValidValue={() => this.fieldChanged({fieldName: 'firstname', isValid: true})}
                  onInvalidValue={() => this.fieldChanged({fieldName: 'firstname', isValid: false})}
                  label='Firstname'
                  placeholder=''
                  validation={/\w+/}
                  errMsg={"firstname cannot be empty or contain only special characters"}/>
              <TextField
                  value={this.props.values.lastname}
                  onValidValue= {() => this.fieldChanged({fieldName: 'lastname', isValid: true})}
                  onInvalidValue= {() => this.fieldChanged({fieldName: 'lastname', isValid: true})}
                  label='Lastname'
                  placeholder=''
                  validation={/\w+/}
                  errMsg={"lastname cannot be empty or contain only special characters"}/>
              <TextField
                  value={this.props.values.telephone}
                  onValidValue= {() => this.fieldChanged({fieldName: 'telephone', isValid: true})}
                  onInvalidValue= {() => this.fieldChanged({fieldName: 'telephone', isValid: true})}
                  label='Telephone'
                  placeholder=''
                  validation={/\+\d{2,}\s\d{2,}\s\d{6,}/}
                  errMsg={"Must be of form: +32 34 323453 (plus sign, space, group of digits, space, group of digits with at least 6 digits )"}/>
            </div>
          </div>
        )
    }
  }
