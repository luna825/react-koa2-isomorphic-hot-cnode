const {resolve} = require('path')
const r = path => resolve(__dirname, path)

const webpack = require('webpack')

module.exports = {
  entry: [
    r('../client/client.js')
  ],
  output: {
    filename: 'bundle.js',
    path: r('../public'),
    publicPath: '/public/'
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        include: [r('../client')],
        loader: 'babel-loader',
        options: {
          presets:['env', 'react', 'stage-0', 'stage-3']
        }
      }
    ]
  },
  plugins: []
}
