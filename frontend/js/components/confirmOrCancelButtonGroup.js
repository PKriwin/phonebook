import React, { Component } from 'react'

export class ConfirmOrCancelButtonGroup extends Component {

    constructor(props) {

        super(props)
    }

    render() {
        return (
          <div className='section'>
            <div className='container is-fluid'>
              <div className="field is-grouped is-pulled-right">
                <div className="control">
                  <button className="button is-black">Confirm</button>
                </div>
                <div className="control">
                  <button className="button is-outline is-inverted">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
