import {
  resolve
} from 'path'
import webpack from 'webpack'
import {
  devMiddleware,
  hotMiddleware
} from 'koa-webpack-middleware'
import views from 'koa-views'
import koaBody from 'koa-bodyparser'
import session from 'koa-session'

const r = path => resolve(__dirname, path)
const config = require('../../build/webpack.config.dev')
const compiler = webpack(config)

//session config
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 1000 * 60 * 60,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

//ejs 模版
export const addViews = (app) => {
  app.use(views(r('../../views/dev'), {
    map: {
      html: 'ejs'
    }
  }))
}
// koa webpack中间件 编译在内存中
export const addDevMiddleware = (app) => {
  app.use(devMiddleware(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath,
    hot: true,
    stats: {
      colors: true
    }
  }))
}

//热替换中间件
export const addHotMiddleware = (app) => {
  app.use(hotMiddleware(compiler))
}

export const addbody = (app) => {
  app.use(koaBody())
}

export const addSession = (app) => {
  app.keys = ['some secret hurr'];
  app.use(session(CONFIG, app))
}
