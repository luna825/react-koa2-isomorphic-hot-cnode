import Koa from 'koa'
import {resolve} from 'path'
import R from 'ramda'

import serverRender from './middlewares/serverRender'
//绝对路径函数
const r = path => resolve(__dirname, path)
//默认的启动地址和端口
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8500
const isDev = process.env.NODE_ENV === 'development'
//服务器类
export default class Server {
  constructor() {
    this.app = new Koa()
    //./middlewares 为中间件文件夹
    if(isDev){
      this.useMiddlware(this.app)(require('./middlewares/dev'))
    }else{
      this.useMiddlware(this.app)(require('./middlewares/pro'))
    }
  }
  //引用中间件
  useMiddlware(app) {
    return R.map(i => i(app))
  }
  //服务启动
  start() {
    this.app.use(serverRender)
    this.app.listen(port, host)
    console.log(`Server is listening on ${host}:${port}`)
  }
}

const server = new Server()
server.start() //启动服务
