export default function promiseMiddeware(){
  return ({dispatch, getState }) => {
    return next => action =>{
      const {types, promise, ...ret} = action
      if(!promise){
        return next(action)
      }

      const [REQUEST, SUCCESS, FAILED] = types
      next( { ...ret, type:REQUEST } )
      promise.then(result=>{
        next({ ...ret, result, type:SUCCESS })
      }).catch(error=>{
        console.log('MIDDLEWARE ERROR:', error)
        next({...ret, error, type:FAILED})
      })

      return promise
    }
  }
}
