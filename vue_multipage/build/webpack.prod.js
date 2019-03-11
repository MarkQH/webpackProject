const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CleanWwebpackPlugin = require("clean-webpack-plugin")
const PurifyCSS = require("purifycss-webpack")
const glob = require("glob-all")
const path = require("path")

module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: "common",
          chunks: "all",
          minChunks: 2,
          priority: 0
        },
        vue: {
          name: "vue.boundle",
          test: "vue",
          chunks: "all",
          priority: 10
        }
      }
    }
  },
  plugins: [
    new LodashModuleReplacementPlugin,
    new CleanWwebpackPlugin(["dist"], {
      root: path.join(__dirname, ".."),
      verbose: true
    }),
    new PurifyCSS({
      paths: glob.sync([
        path.join(__dirname, "../views/*.pug"),
        path.join(__dirname, "../src/js/*.js"),
        path.join(__dirname, "../src/scss/*.scss"),
        path.join(__dirname, "../src/scss/*.css"),
      ])
    }),
    new BundleAnalyzerPlugin()
  ]
}