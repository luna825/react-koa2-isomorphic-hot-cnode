import {
  get
} from '../../util/http'
const R = require('ramda')
const LOAD = 'app/topics/LOAD'
const LOAD_SUCCESS = 'app/topics/LOAD_SUCCESS'
const LOAD_FAILED = 'app/topics/LOAD_FAILED'
//根据key的来确定是否进行concat
const isTop = topic => topic.top !== true
let concatValues = (k, l, r) => k === 'data' ? R.concat(l, R.filter(isTop,r)) : r

const initialState = {
  loaded: false,
  loading: false,
  pageInfo: {
    tab: 'all',
    limit: 5,
    page: 0,
    isMore: true
  },
  data: {}
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      console.log(LOAD)
      return {
        ...state,
        loading: true
      }
    case LOAD_SUCCESS:
      action.pageInfo.isMore = action.result.data.length === action.pageInfo.limit
      console.log(LOAD_SUCCESS)
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.add ? R.mergeDeepWithKey(concatValues, state.data, action.result) : action.result,
        pageInfo: R.over(R.lensProp('page'), R.inc, action.pageInfo),
        error: null
      }
    case LOAD_FAILED:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      }
    default:
      return state
  }
}


export function load(tab='all', add=false){
  return async (dispatch, getState) => {
    try{
      let pageInfo =  getState().topics.pageInfo
      //切换标签时页面信息从0开始
      pageInfo = tab === pageInfo.tab ? pageInfo : {tab, nextPage: 0, limit: 5}
      dispatch({type: LOAD})
      const resp = await get('/topics', pageInfo)
      dispatch({type: LOAD_SUCCESS, pageInfo, add, result: resp})
    }catch(err){
      console.log(err.response)
      dispatch({type: LOAD_FAILED, error: err.response.data.msg})
    }
  }
}
