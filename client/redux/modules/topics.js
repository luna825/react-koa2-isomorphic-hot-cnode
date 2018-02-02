import {
  get
} from '../../util/http'

const LOAD = 'app/topics/LOAD'
const LOAD_SUCCESS = 'app/topics/LOAD_SUCCESS'
const LOAD_FAILED = 'app/topics/LOAD_FAILED'

const initialState = {
  loaded: false,
}

export default function reducer(state = initialState, action = {}) {
  switch(action.type){
    case LOAD:
      return {
        ...state,
        loading: true
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      }
    case LOAD_FAILED:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      }
    default:
      return state
  }
}

export function load(tab='all'){
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAILED],
    promise: get('/topics', {
      tab: tab
    })
  }
}
