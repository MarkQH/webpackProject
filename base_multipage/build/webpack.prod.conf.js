const ExtractTextPlugin = require("extract-text-webpack-plugin"); // get css
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin'); // 按需引入lodash功能
const CleanWwebpackPlugin = require("clean-webpack-plugin"); // clean dist
const PurifyCSS = require("purifycss-webpack"); //css tree shaking
const glob = require("glob-all"); // css tree shaking
const path = require("path");

module.exports = {
  mode: "production",
  plugins: [
    new LodashModuleReplacementPlugin,
    new ExtractTextPlugin({
      filename: "assets/css/[name]-[hash:5].min.css",
      allChunks: false,
    }),
    new CleanWwebpackPlugin(["dist"], {
      root: path.join(__dirname, ".."),
      verbose: true
    }),
    new PurifyCSS({
      paths: glob.sync([
        path.join(__dirname, "../src/views/*.html"),
        path.join(__dirname, "../src/js/*.js"),
        path.join(__dirname, "../src/scss/*.scss"),
        path.join(__dirname, "../src/scss/*.css"),
      ])
    })
  ]
}