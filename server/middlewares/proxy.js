import Router from 'koa-router'
import axios from 'axios'
import querystring from 'query-string'

const baseUrl = 'http://cnodejs.org'
const router = new Router();

export const addRouter = (app) => {

  router.all('/api/v1/:category', async (ctx, next) => {
    const path = ctx.path
    const user = {}
    const needAccessToken = ctx.query.needAccessToken

    if (needAccessToken && !user.accessToken) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        msg: 'need login'
      }
    }

    const query = Object.assign({}, ctx.query, {
      accesstoken: (needAccessToken && ctx.method === 'GET') ? user.accessToken : ''
    })

    const resp = await axios(`${baseUrl}${path}`, {
      method: ctx.method,
      params: query,
      data: querystring.stringify(Object.assign({}, ctx.request.body, {
        accesstoken: (needAccessToken && ctx.method === 'POST') ? user.accessToken : ''
      })),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    ctx.status = resp.status
    ctx.body = resp.data

  })

  app.use(router.routes())
  app.use(router.allowedMethods())
}
