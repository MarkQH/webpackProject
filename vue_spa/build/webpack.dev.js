
const webpack = require("webpack");
const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  module: {
    rules: [
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader']
      },
    ]
  },
  devtool: "eval-source-map",
  devServer: {
    open: true,
    port: 8081,
    hot: true,
    overlay: true,
    clientLogLevel: "error",
    publicPath: "/",
    contentBase: resolve(__dirname, "../dist"),
    proxy: {

    },
  historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}