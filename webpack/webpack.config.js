const config = require('config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: process.cwd(),
    filename: './dist/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: [/node_modules/]
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'dist/index.html',
      template: './client/index.html'
    }),
    new LodashModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.API_HOST': JSON.stringify(config.get('api_host'))
    })
  ]
}
