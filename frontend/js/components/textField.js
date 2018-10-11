import React, { Component } from 'react'

export default class TextField extends Component {

  constructor(props) {

      super(props)

      this.state = {value: this.props.value, invalidValue: false};
 
      this.handleOnChange = this.handleOnChange.bind(this);
      this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleOnBlur() {

      this.setState({
        value: this.state.value,
        invalidValue: !this.state.value.match(this.props.validation)
      })

      if (this.state.value.match(this.props.validation))
        this.props.onValidValue()
      else
        this.props.onInvalidValue()
  }

  handleOnChange(event) {

    this.setState({value: event.target.value});
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
                        className={this.state.invalidValue ?
                          'input is-danger' : 'input'}
                        type="text"
                        placeholder={this.props.placeholder}/>
                        {
                          this.state.invalidValue ?
                            <p className="help is-danger">{this.props.errMsg}</p> : null
                        }
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
