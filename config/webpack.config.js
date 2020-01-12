const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './development/index'
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
      template: './development/index.html'
    })
  ],
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true
  }
};
