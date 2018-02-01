//服务端渲染
import React from 'react'
import {
  renderToString
} from 'react-dom/server'

import { StaticRouter } from 'react-router-dom'
import App from '../../client/containers/App'

export default async function(ctx, next) {
  const context ={}
  const html = renderToString(
    <StaticRouter location={ctx.url} context={context}>
      <App />
    </StaticRouter>
  )
  if(context.url){
    ctx.status=301
    ctx.redirect(context.url)
  }else{
    ctx.status=200
    await ctx.render('index', {
      root: html
    })
  }
}
