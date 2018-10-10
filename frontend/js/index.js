import '../css/main.css'
import 'bulma/css/bulma.min.css'
import 'font-awesome/css/font-awesome.min.css'


import React, { Component } from 'react'
import { render }           from 'react-dom'

class App extends Component {

    constructor(props) {

        super(props)
    }

    render() {
        return (
          <div class="container is-fluid">
            <div class="notification">
              This container is <strong>fluid</strong>: it <i class="fas fa-user"></i>will have a 32px gap on either side, on any
              viewport size.
            </div>
          </div>
        )
    }
}

render((<App />), document.getElementById('app'))
