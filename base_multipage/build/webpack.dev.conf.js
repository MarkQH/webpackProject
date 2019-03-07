const webpack = require("webpack")
const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    port:8081,
    hot: true,
    overlay: true,
    clientLogLevel: "error",
    publicPath: "/",
    contentBase: path.resolve(__dirname, "../dist"),
    proxy: {
      "/comments": {
        target: "https://m.weibo.cn",
        changeOrigin: true,
        logLevel: "debug",
        headers: {
          cookie: ""
        }
      }
    },
  historyApiFallback: true
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].min.css",
      allChunks: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}