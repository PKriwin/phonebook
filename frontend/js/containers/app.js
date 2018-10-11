import React, { Component } from 'react'

import Navbar from '../components/navbar'

import CreatePersonForm from './createPersonForm'

export class App extends Component {

    constructor(props) {

        super(props)
    }

    render() {
        return (
          <div>
            <Navbar/>
            <CreatePersonForm />
          </div>
        )
    }
}
