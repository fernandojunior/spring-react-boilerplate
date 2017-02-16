// Reference: https://github.com/facebookincubator/create-react-app/issues/1354

process.env.NODE_ENV = 'production'
var reactScriptsConfig = require('react-scripts/config/webpack.config.prod')
module.exports = Object.assign({}, reactScriptsConfig, {
  output: Object.assign({}, reactScriptsConfig.output, {
     path: '../resources/static'
  })
})
