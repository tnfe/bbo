const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const webpack = require('webpack');
const { cdnPrefix } = require('./config');

const IS_WDS = /webpack-dev-server/.test(process.env.npm_lifecycle_script);

let config = {
  entry: {
    debug: './src/debug'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '调试工具',
      filename: IS_WDS ? 'debug.html' : 'debug.html',
      template: 'src/debug/debug.ejs',
      cdnPrefix,
      cache: true,
      chunks: ['debug'],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        // collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    })
  ],
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map'
};

config.plugins.push(new HtmlWebpackInlineSourcePlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;
