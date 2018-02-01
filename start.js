require('babel-core/register')({
  "presets":[["env",{"targets":{"node":"current"}}], 'stage-3'],
  "plugins": [
    "transform-decorators-legacy", ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "css"
    }]
  ],
  "ignore": /node_modules\/(?!antd)/
})
require('babel-polyfill')

// Css require hook
require('css-modules-require-hook')({
    extensions: ['.css','.scss'],
    preprocessCss: (data, filename) =>
        require('node-sass').renderSync({
            data,
            file: filename
        }).css,
    camelCase: true,
    generateScopedName: '[name]__[local]__[hash:base64:5]'
})

require('./server')
