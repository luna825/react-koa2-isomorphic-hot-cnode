const {resolve} = require('path')
const r = path => resolve(__dirname, path)

const webpack = require('webpack')

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    "react-hot-loader/patch",
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
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
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
