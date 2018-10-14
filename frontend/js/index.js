import '../css/main.css'
import 'bulma/css/bulma.min.css'

import React, { Component } from 'react'
import { render }           from 'react-dom'
import { library }          from '@fortawesome/fontawesome-svg-core'
import { faPhoneSquare, faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons'

library.add(faPhoneSquare, faPlusCircle, faEdit)

import { App } from './containers/app'

render((<App />), document.getElementById('app'))
