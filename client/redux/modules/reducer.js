import {combineReducers} from 'redux'

import count from './count'
import topics from './topics'
import auth from './auth'

const rootReducers = combineReducers({
  count,
  topics,
  auth
})

export default rootReducers
