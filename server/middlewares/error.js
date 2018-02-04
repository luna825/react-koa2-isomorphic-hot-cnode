export const adderr = (app) => {
  app.use(async (ctx, next)=>{
    try{
      await next()
    }catch(e){
      if(e.response){
        let status = e.response.status || 500
        let msg = e.response.statusText || '服务器错误'
        ctx.status = status
        ctx.body = {
          success:false,
          msg
        }
      }else{
        ctx.status = 500
        ctx.body = {
          success: false,
          msg: '未知错误'
        }
      }
    }
  })
}
