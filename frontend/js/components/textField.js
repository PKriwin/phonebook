import React, { Component } from 'react'

import _ from 'lodash'

export default class TextField extends Component {

  constructor(props) {

      super(props)

      this.state = {
         value: this.props.value,
         isValid: this.props.value ?
          this.props.value.match(this.props.validation) !== null : true
       }

      this.handleOnChange = this.handleOnChange.bind(this)
      this.handleOnBlur = this.handleOnBlur.bind(this)
      this.fireOnChange = this.fireOnChange.bind(this)
  }

  handleOnBlur() {

      const newState = _.clone(this.state)

      newState.dispErrMsg = !this.state.value.match(this.props.validation)
      this.setState(newState)
      this.fireOnChange()
  }

  handleOnChange(event) {

    this.setState({
      value: event.target.value,
      isValid: event.target.value.match(this.props.validation) !== null,
      dispErrMsg: false
    })

    this.fireOnChange()
  }

  fireOnChange() {

    this.props.onChange({
      isValid: this.state.isValid,
      value: this.state.value,
    })
  }

  render() {

    return (
      <div className="field is-horizontal">
          <div className="field-label">
              <label className="label">{this.props.label}</label>
          </div>

          <div className="field-body">
              <div className="field">
                  <div className="control">
                      <input
                        value={this.state.value}
                        onBlur={this.handleOnBlur}
                        onChange={this.handleOnChange}
                        className={this.state.dispErrMsg ?
                          'input is-danger' : 'input'}
                        type="text"
                        placeholder={this.props.placeholder}/>
                        {
                          this.state.dispErrMsg ?
                            <p className="help is-danger">{this.props.errMsg}</p> : null
                        }
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
