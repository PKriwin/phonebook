import React, { Component } from 'react'

import Navbar from '../components/navbar'

export class App extends Component {

    constructor(props) {

        super(props)
    }

    render() {
        return (
          <div>
            <Navbar/>
          </div>
        )
    }
}
