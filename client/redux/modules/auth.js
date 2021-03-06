import { post } from '../../util/http'
const LOAD = 'app/auth/LOAD'
const LOAD_SUCCESS = 'app/auth/LOAD_SUCCESS'
const LOAD_FAILED = 'app/auth/LOAD_FAILED'

const initialState = {
  isLogin: false,
  logining: false,
  user:{}
}

export default function reducer(state=initialState, action={}){
  switch(action.type){
    case LOAD:
      return {
        ...state,
        logining: true
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        user: action.result,
        isLogin: true,
        logining: false,
        loginErr: null
      }
    case LOAD_FAILED:
      return {
        ...state,
        isLogin: false,
        logining: false,
        loginErr: action.error,
        user: null
      }
    default:
      return state
  }
}


export function login(token){
  return async (dispatch, getState) =>{
    try{
      dispatch({ type: LOAD })
      const resp = await post('/login', {
        accesstoken: token
      })
      console.log(resp)
      dispatch({type: LOAD_SUCCESS, result: resp})
    }catch(err){
      let error_msg
      console.log(err.response)
      if(err.response){
        error_msg = err.response.data.error_msg
      }else{
        error_msg = '未知错误'
      }
      dispatch({type:LOAD_FAILED, error: error_msg})
      return error_msg
    }
  }
}
