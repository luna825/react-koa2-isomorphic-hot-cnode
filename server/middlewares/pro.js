import {resolve} from 'path'
import koaBody from 'koa-bodyparser'
import views from 'koa-views'
import staticServer from 'koa-static-server'

const r = path => resolve(__dirname, path)
//development middlewares
//JSON数据添加到body上
export const addbody = (app) => {
  app.use(koaBody())
}

//ejs 模版
export const addViews = (app) => {
  app.use(views(r('../../dist/public'), {
    map: {
      html: 'ejs'
    }
  }))
}

//静态资源服务器
export const addStaticServer = (app) => {
  app.use(staticServer({
    rootDir: r('../../dist/public'),
    rootPath:'/public'
  }))
}
