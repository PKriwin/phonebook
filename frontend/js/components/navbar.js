import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Navbar extends Component {

    constructor(props) {

        super(props)
    }

    render() {
        return (
          <nav className="navbar is-fixed-top is-black" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <Link to='/' className="navbar-item" href="#">
                <FontAwesomeIcon icon='phone-square' />
                <span id='brand-logo'><b>Phonebook</b></span>
              </Link>
            </div>

            <div className='navbar-menu'>
              <div className='navbar-end'>
                <Link to='/create_person' className="navbar-item" href="search">
                    <FontAwesomeIcon icon='plus-circle' />
                    <span id='add-entry-menu-item'>Add new entry</span>
                </Link>
              </div>
            </div>
          </nav>
        )
    }
}
