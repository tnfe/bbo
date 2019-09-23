const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    contentBase: path.join(__dirname, 'src'),
    hot: true,
    proxy: {
      '/h5vv': {
        target: 'https://h5vv.video.qq.com',
        secure: true, // 设置支持https协议的代理
        changeOrigin: true, // 可否跨域
        pathRewrite: {
          '^/h5vv': ''
        }
      },
      '/bkvv': {
        target: 'https://bkvv.video.qq.com',
        secure: true, // 设置支持https协议的代理
        changeOrigin: true, // 可否跨域
        pathRewrite: {
          '^/bkvv': ''
        }
      }
    }
  }
});
