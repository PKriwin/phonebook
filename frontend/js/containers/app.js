import React, { Component } from 'react'

import Navbar from '../components/navbar'

import PersonInfosForm from '../components/personInfosForm'

export class App extends Component {

    constructor(props) {

        super(props)
    }

    render() {
        return (
          <div>
            <Navbar/>
            <PersonInfosForm
              values={{
                firstname: 'michel',
                lastname: 'jackson',
                telephone: '+32 65 876543'
              }}
              onValidInfos={() => {console.log('validooo')}}/>
          </div>
        )
    }
}
