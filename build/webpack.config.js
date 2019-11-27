const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './test/index'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './test/index.html'
    })
  ],
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true
  }
};
