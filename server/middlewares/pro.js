import koaBody from 'koa-bodyparser'

//development middlewares

export const addbody = (app) => {
  app.use(koaBody())
}
