const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CleanWwebpackPlugin = require("clean-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const PurifyCSS = require("purifycss-webpack")
const glob = require("glob-all")
const path = require("path")



module.exports = env => {

  const compress = env.compress;

  return {
    mode: 'production',
    plugins: [
      new LodashModuleReplacementPlugin,
      new MiniCssExtractPlugin({
        filename: 'styles/[name]-[hash:5].css',
      }),
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
    ].concat(
      compress ? new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(js|css)$'),
        threshold: 10240,
        minRatio: 0.8
      }) : []
    )
  }
}