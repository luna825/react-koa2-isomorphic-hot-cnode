const {
  resolve
} = require('path')
const r = path => resolve(__dirname, path)

const webpack = require('webpack')

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    // 'webpack-hot-middleware/client?reload=true',
    "react-hot-loader/patch",
    r('../client/client.js')
  ],
  output: {
    filename: 'bundle.js',
    path: r('../public'),
    publicPath: '/public/'
  },
  module: {
    rules: [{
        test: /\.js$/,
        include: [r('../client')],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins:[require('autoprefixer')]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules', 'client'],
    extensions: [".js", ".json", ".jsx", ".css"],
  },
  devServer:{
    contentBase: r('../public'),
    compress: true,
    hot: true,
    historyApiFallback: true,
    publicPath: '/public/',
    proxy:{
      '/api/v1':{
        target: 'http://cnodejs.org',
        changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      __CLIENT__: true
    })
  ]
}
