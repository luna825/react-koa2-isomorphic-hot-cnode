import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'

import rootReducers from './modules/reducer'
import thunk from 'redux-thunk'

export default function createWithMiddleware(initialState) {

  const enhancer = compose(
    applyMiddleware(thunk)
  )

  const store = createStore(rootReducers, initialState, enhancer)

  return store
}
