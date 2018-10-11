import React, { Component } from 'react'

export default class Navbar extends Component {

    constructor(props) {

        super(props)
    }

    render() {
        return (
          <nav className="navbar is-fixed-top is-black" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-item" href="#"><i id="brand-logo" className='fas fa-phone-square'></i><b>Phonebook</b></a>
            </div>
          </nav>
        )
    }
}
