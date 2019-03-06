const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWwebpackPlugin = require("clean-webpack-plugin");
const PurifyCSS = require("purifycss-webpack");
const glob = require("glob-all");
const path = require("path");


module.exports = {
  mode: "production",
  plugins: [
    new ExtractTextPlugin({
      filename: "assets/css/[name].min.css",
      allChunks: false
    }),
    new CleanWwebpackPlugin(["dist"], {
      root: path.resolve(__dirname, ".."),
      verbose: true
    }),
    new PurifyCSS({
      paths: glob.sync([
        path.resolve(__dirname, "../src/views/*.html"),
        path.resolve(__dirname, "../src/js/*.js"),
        path.resolve(__dirname, "../src/scss/*.scss"),
      ])
    })
  ]
}