import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'

import TopicList from '../containers/TopicList'
import TopicDetail from '../containers/TopicDetail'
import NoMatch from '../containers/NoMatch/NoMatch'
import Login from '../containers/Login/Login'

export default () => (
  <Switch>
    <Route path='/' exact render={()=><Redirect to='/index' />} />
    <Route path='/index' component={TopicList} />
    <Route path='/detail/:id' exact component={TopicDetail} />
    <Route path='/login' component={Login} />
    <Route component={NoMatch} />
  </Switch>
)
