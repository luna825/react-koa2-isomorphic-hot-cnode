const {
  resolve
} = require('path')
const fs = require('fs')
const r = path => resolve(__dirname, path)
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
let clientConfig, serverConfig


// function getExternals() {
//   return fs.readdirSync(r('../node_modules'))
//     .filter(filename => !filename.includes('.bin'))
//     .reduce((externals, filename) => {
//       externals[filename] = `commonjs ${filename}`
//
//       return externals
//     }, {})
// }

const nodeModules = fs.readdirSync('node_modules')
  .filter(function (i) {
    return ['.bin', '.npminstall'].indexOf(i) === -1
  })

clientConfig = {
  entry: {
    app: r('../client/client.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: r('../dist/public'),
    publicPath: '/public/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [r('../client')],
      loader: 'babel-loader',
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new htmlWebpackPlugin({
      template: r('../client/template.html'),
      filename: 'index.html'
    })
  ]
}

serverConfig = {
  entry: {
    server: r('../server/index.js')
  },
  output: {
    path: r('../dist'),
    filename: '[name].js'
  },
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  externals: [
    function(context, request, callback) {
      var pathStart = request.split('/')[0]
      if (pathStart && (pathStart[0] === '!') || nodeModules.indexOf(pathStart) >= 0 && request !== 'webpack/hot/signal.js') {
        return callback(null, 'commonjs ' + request)
      }
      callback()
    }
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
    }),
  ]
}

module.exports = [clientConfig, serverConfig]
