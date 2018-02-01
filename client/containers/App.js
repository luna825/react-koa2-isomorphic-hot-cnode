import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Routes from '../config/router'

export default class App extends Component {
  render(){
    return(
      <div>
        <h1>welcome</h1>
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
