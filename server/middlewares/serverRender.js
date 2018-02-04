//服务端渲染
import React from 'react'
import {
  renderToString
} from 'react-dom/server'
//静态路由
import { StaticRouter } from 'react-router-dom'
//server端redux
import asyncBootstrapper from 'react-async-bootstrapper'
// import reactTreeWalker from 'react-tree-walker';
import {Provider} from 'react-redux'
import createWithMiddleware from '../../client/redux/create'
import App from '../../client/containers/App'


export default async function(ctx, next) {
  console.log('server')
  const store = createWithMiddleware({})
  const context ={}
  const serverApp = ()=>
      (<StaticRouter location={ctx.url} context={context}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>)
      
  await asyncBootstrapper(serverApp())

  console.log(store.getState().topics)
  const html = renderToString(
    serverApp()
  )

  if(context.url){
    ctx.status=301
    ctx.redirect(context.url)
  }else{
    ctx.status=200
    await ctx.render('index', {
      root: html,
      state: store.getState(),
      title: 'M-Node'
    })
  }

}
