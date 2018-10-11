import React, { Component } from 'react'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Navbar           from '../components/navbar'
import CreatePersonForm from './createPersonForm'
import UpdatePersonForm from './updatePersonForm'
import SearchPersonForm from './searchPersonForm'

export class App extends Component {

    constructor(props) {

        super(props)
    }

    render() {
        return (
          <Router>
          <div>
              <Navbar/>
                  <Route exact path="/" component={SearchPersonForm} />
                  <Route path="/update_person" component={() =>
                    <UpdatePersonForm person={{ id:1, firstname: 'first', lastname: 'last', telephone: '+32 54 676543' }}/>
                  }/>
                  <Route path="/create_person" component={CreatePersonForm}/>
            </div>
          </Router>
        )
    }
}
