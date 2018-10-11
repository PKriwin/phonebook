import '../css/main.css'
import 'bulma/css/bulma.min.css'
import 'font-awesome/css/font-awesome.css'

import React, { Component } from 'react'
import { render }           from 'react-dom'

import { App } from './containers/app'


render((<App />), document.getElementById('app'))
