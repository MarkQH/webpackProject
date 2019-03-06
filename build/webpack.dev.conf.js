const webpack = require("webpack")
const path = require("path")

module.exports = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    // contentBase: path.resolve(__dirname, "../dist/"),
    port:8081,
    hot: true,
    overlay: true,
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}