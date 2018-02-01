//服务端渲染
import React from 'react'
import {
  renderToString
} from 'react-dom/server'
//静态路由
import { StaticRouter } from 'react-router-dom'
//server端redux
import {Provider} from 'react-redux'
import createWithMiddleware from '../../client/redux/create'
import App from '../../client/containers/App'

export default async function(ctx, next) {
  const store = createWithMiddleware({})
  const context ={}
  const html = renderToString(
    <StaticRouter location={ctx.url} context={context}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
  if(context.url){
    ctx.status=301
    ctx.redirect(context.url)
  }else{
    ctx.status=200
    await ctx.render('index', {
      root: html,
      state: store.getState()
    })
  }
}
