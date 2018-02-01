const {
  resolve
} = require('path')
const fs = require('fs')
const r = path => resolve(__dirname, path)
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
let clientConfig, serverConfig


function getExternals() {
  return fs.readdirSync(r('../node_modules'))
    .filter(filename => !filename.includes('.bin'))
    .reduce((externals, filename) => {
      externals[filename] = `commonjs ${filename}`

      return externals
    }, {})
}


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
      options: {
        presets: ["env", "react", "stage-0", "stage-3"],
        plugins: ['transform-decorators-legacy']
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new htmlWebpackPlugin({
      template: '!!ejs-compiled-loader!' + r('../client/template.ejs'),
      filename: 'index.html'
    }),
    new webpack.optimize.UglifyJsPlugin()
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
      loader: 'babel-loader',
      options: {
        presets: [
          ["env", {
            "targets": {
              "node": "current"
            }
          }], 'react', 'stage-0', 'stage-3'
        ],
        plugins: ['transform-decorators-legacy']
      }
    }]
  },
  externals: getExternals(),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
}

module.exports = [clientConfig, serverConfig]
