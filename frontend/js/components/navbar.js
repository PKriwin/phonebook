import React, { Component } from 'react'

import { Link } from "react-router-dom";


export default class Navbar extends Component {

    constructor(props) {

        super(props)
    }

    render() {
        return (
          <nav className="navbar is-fixed-top is-black" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <Link to='/' className="navbar-item" href="#"><i id="brand-logo" className='fas fa-phone-square'></i>
                <b>Phonebook</b>
              </Link>
            </div>

            <div className='navbar-menu'>
              <div className='navbar-end'>
                <Link to='/create_person' className="navbar-item" href="search">
                  <i className="fas fa-plus-circle" id="add-entry-menu-item"></i>
                    <span id='add-entry-menu-item'>Add new entry</span>
                </Link>
              </div>
            </div>
          </nav>
        )
    }
}
