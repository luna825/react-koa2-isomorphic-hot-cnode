import Koa from 'koa'
import {resolve} from 'path'
import R from 'ramda'

//绝对路径函数
const r = path => resolve(__dirname, path)
//默认的启动地址和端口
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8500

//服务器类
  constructor() {
    this.app = new Koa()
    //./middlewares 为中间件文件
    this.useMiddlware(this.app)(require('./middlewares'))
  }
  //引用中间件
  useMiddlware(app) {
    return R.map(i => i(app))
  }
  //服务启动
  start() {
    this.app.use(ctx => {
      ctx.status = 200
      ctx.body = 'hello koa'
    })
    this.app.listen(port, host)
    console.log(`Server is listening on ${host}:${port}`)
  }
}

const server = new Server()
server.start() //启动服务
