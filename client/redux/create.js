import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'

import rootReducers from './modules/reducer'
import thunk from 'redux-thunk'
import promiseMiddleware from './middlewares/promiseMiddleware'
const isDev = process.env.NODE_ENV ==='development'

export default function createWithMiddleware(initialState) {
  const composeEnhancers =
    typeof window === 'object' && isDev &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunk, promiseMiddleware())
  )

  const store = createStore(rootReducers, initialState, enhancer)

  return store
}
