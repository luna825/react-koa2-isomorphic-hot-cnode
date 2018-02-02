import {combineReducers} from 'redux'

import count from './count'
import topics from './topics'

const rootReducers = combineReducers({
  count,
  topics
})

export default rootReducers
