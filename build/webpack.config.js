const {
  resolve
} = require('path')
const fs = require('fs')
const r = path => resolve(__dirname, path)
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
// Create multiple instances
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name]-one-[hash:base64:5].css')
const extractSCSS = new ExtractTextPlugin('[name]-two-[[hash:base64:5]].css')
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
    path: r('../dist/'),
    publicPath: '/public/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [r('../client')],
      loader: 'babel-loader',
      options: {
        presets: ["env", "react", "stage-0", "stage-3"],
        plugins: [
          'transform-decorators-legacy', ['import', [{
            "libraryName": "antd",
            "style": 'css',
            "libraryDirectory": "es",
          }]],
        ]
      }
    }, {
      test: /\.css$/,
      use: extractCSS.extract(['css-loader'])
    }, {
      test: /\.scss$/,
      use: extractSCSS.extract({
        fallback: 'style-loader',
        use: [{
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          },
          'sass-loader'
        ]
      })
    }]
  },
  resolve: {
    modules: ['node_modules', r('../client')],
    extensions: [".js", ".json", ".jsx", ".css"],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __SSR__: JSON.stringify(process.env.SSR) || false,
      __CLIENT__: true
    }),
    new htmlWebpackPlugin({
      template: '!!ejs-compiled-loader!' + r('../client/template.ejs'),
      filename: 'index.html',
      favicon: r('../favicon.ico'),
    }),
    new webpack.optimize.UglifyJsPlugin(),
    extractCSS,
    extractSCSS
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
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'css-loader/locals',
        options: {
          module: true,
          localIdentName: '[name]__[local]__[hash:base64:5]'
        }
      }]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  resolve: {
    modules: ['node_modules', r('../client'), r('../server')],
    extensions: [".js", ".json", ".jsx", ".css"],
  },
  externals: getExternals(),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __SSR__: JSON.stringify(process.env.SSR) || false,
      __CLIENT__: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
}

module.exports = [clientConfig, serverConfig]
