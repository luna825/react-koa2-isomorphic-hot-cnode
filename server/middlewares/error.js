export const adderr = (app) => {
  app.use(async (ctx, next)=>{
    try{
      await next()
    }catch(e){
      console.log(e)
      if(e.response && typeof e.response.data === 'object'){
        let status = e.response.status || 500
        ctx.status = status
        ctx.body = e.response.data
      }else{
        ctx.status = 500
        ctx.body = {
          success: false,
          error_msg: '未知错误'
        }
      }
    }
  })
}
