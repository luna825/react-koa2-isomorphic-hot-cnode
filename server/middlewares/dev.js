import {
  resolve
} from 'path'
import webpack from 'webpack'
import {
  devMiddleware,
  hotMiddleware
} from 'koa-webpack-middleware'
import views from 'koa-views'

const r = path => resolve(__dirname, path)
const config = require('../../build/webpack.config.dev')
const compiler = webpack(config)


export const addViews = (app) => {
  app.use(views(r('../../views/dev'), {
    map: {
      html: 'ejs'
    }
  }))
}

export const addDevMiddleware = (app) => {
  app.use(devMiddleware(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }))
}
