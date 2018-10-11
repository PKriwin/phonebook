import React, { Component } from 'react'

export default class ConfirmOrCancelButtonGroup extends Component {

    constructor(props) {

        super(props)
    }

    render() {
        return (
          <div className='section'>
            <div className='container is-fluid'>
              <div className="field is-grouped is-pulled-right">
                <div className="control">
                  <button
                    disabled={!this.props.confimEnabled}
                    className="button is-black"
                    onClick={this.props.onConfirm}
                  >Confirm</button>
                </div>
                <div className="control">
                  <button
                    className="button is-outline is-inverted"
                    onClick={this.props.onCancel}
                  >Cancel</button>
                </div>
                </div>
            </div>
          </div>
        )
    }
}
