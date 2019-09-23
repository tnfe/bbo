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
      '/www': {
        target: 'https://www.qq.com',
        secure: true, // 设置支持https协议的代理
        changeOrigin: true, // 可否跨域
        pathRewrite: {
          '^/www': ''
        }
      }
    }
  }
});
