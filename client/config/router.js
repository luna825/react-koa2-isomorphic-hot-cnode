import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'

import TopicList from '../containers/TopicList'
import TopicDetail from '../containers/TopicDetail'

export default () => (
  <Switch>
    <Route path='/' exact render={()=><Redirect to='/index' />} />
    <Route path='/index' component={TopicList} />
    <Route path='/detail' component={TopicDetail} />
  </Switch>
)
