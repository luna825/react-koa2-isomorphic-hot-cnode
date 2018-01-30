require('babel-core/register')({
  "presets":[["env",{"targets":{"node":"current"}}], 'stage-3'],
})

require('babel-polyfill')
require('./server')
