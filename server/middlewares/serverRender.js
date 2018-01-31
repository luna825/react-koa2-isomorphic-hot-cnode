//服务端渲染
import React from 'react'
import {
  renderToString
} from 'react-dom/server'

import App from '../../client/App'

export default async function(ctx, next) {
  await ctx.render('index', {
    root: renderToString( < App / > )
  })
}
