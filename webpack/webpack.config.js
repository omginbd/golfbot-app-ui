const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const webpack = require('webpack')

const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: `${process.cwd()}/dist/`,
    filename: 'bundle.js'
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
      template: './client/index.html'
    }),
    new LodashModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.API_HOST': IS_PROD
        ? '"https://api.wiffleball.xyz"'
        : '"http://localhost:3000"'
    })
  ]
}
