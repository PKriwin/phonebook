import React, { Component } from 'react'

import Navbar from '../components/navbar'

import UpdatePersonForm from './updatePersonForm'

export class App extends Component {

    constructor(props) {

        super(props)
    }

    render() {
        return (
          <div>
            <Navbar/>
            <UpdatePersonForm
              person={{
                firstname: 'michel',
                lastname: 'jackson',
                telephone: '+32 65 876543'
              }}/>
          </div>
        )
    }
}
