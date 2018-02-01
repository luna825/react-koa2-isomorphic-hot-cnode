import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Routes from '../config/router'

import {Navbar} from '../components'

export default class App extends Component {
  render(){
    return(
      <div>
        <Navbar>
          <h1>Nav</h1>
        </Navbar>
        <ul>
          <li><Link to='/'>home</Link></li>
          <li><Link to='/list'>list</Link></li>
          <li><Link to='/detail'>detail</Link></li>
        </ul>
        <Routes />
      </div>
    )
  }
}
