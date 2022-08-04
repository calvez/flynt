const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { host, domain, watchFiles } = require('./build-config.js')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devServer: {
    static: false,
    devMiddleware: {
      index: false, // specify to enable root proxying
      writeToDisk: true,
      stats: 'minimal'
    },
    proxy: {
      context: () => true,
      target: host,
      changeOrigin: true,
      selfHandleResponse: true
    },
    host: 'localhost',
    port: 3000,
    https: false, // set to true and install ssl certificate from host:port manually to enable https
    allowedHosts: [domain, `*.${domain}`],
    watchFiles
  }
})
