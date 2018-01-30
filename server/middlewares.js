import koaBody from 'koa-bodyparser'

export const addbody = (app) => {
  app.use(koaBody())
}
