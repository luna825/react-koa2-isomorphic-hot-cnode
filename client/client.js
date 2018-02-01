import React from 'react'
import ReactDOM from 'react-dom'
//hot replace
import { AppContainer } from 'react-hot-loader'
//路由采用browserRouter
import {BrowserRouter as Router } from 'react-router-dom'
import App from './containers/App'

const root = document.getElementById('root')
const render = Component =>{
  ReactDOM.hydrate(
    <AppContainer>
      <Router>
        <Component />
      </Router>
    </AppContainer>,
    root
  )
}
render(App)

if(module.hot){
  module.hot.accept('./containers/App.js', ()=>{
    const NextApp = require('./containers/App.js').default
    render(NextApp)
  })
}

// ReactDOM.hydrate(<App />, document.getElementById('root'))
