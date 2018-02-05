export const adderr = (app) => {
  app.use(async (ctx, next)=>{
    try{
      await next()
    }catch(e){
      if(e.response){
        console.log(e.response.data)
        let status = e.response.status || 500
        ctx.status = status
        ctx.body = e.response.data
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
