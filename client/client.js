import React from 'react'
import {render, hydrate} from 'react-dom'
//hot replace
import { AppContainer } from 'react-hot-loader'
//路由采用browserRouter
import {BrowserRouter as Router } from 'react-router-dom'
//redux配置
import {Provider} from 'react-redux'
import createWithMiddleware from './redux/create'
//app应用
import App from './containers/App'
import './style/colors.css'

const store = createWithMiddleware(window.REDUX_STATE)
const nodeRender = __SSR__ ? hydrate : render
const root = document.getElementById('root')
const appRender = Component =>{
  nodeRender(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    </AppContainer>,
    root
  )
}
appRender(App)

if(module.hot){
  module.hot.accept('./containers/App.js', ()=>{
    const NextApp = require('./containers/App.js').default
    appRender(NextApp)
  })
}

// ReactDOM.hydrate(<App />, document.getElementById('root'))
