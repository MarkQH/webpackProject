'use strict';

const path = require("path");
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin'); // 按需引入lodash功能
const CleanWwebpackPlugin = require("clean-webpack-plugin"); // clean dist
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //分析打包大小
const CompressionPlugin = require("compression-webpack-plugin") // Gzip

const ROOT_PATH = path.resolve(__dirname);

module.exports = env => {

  let isProd = !!env.production
  let compress = !!env.compress

  let spritesConfig = {
  spritePath: "./dist/images",
  filterBy: function (image) {
    if (image.url.indexOf('/images/sprites/') === -1) {
        return Promise.reject();
    }
    return Promise.resolve();
  }}

  return {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'eval' : 'source-maps',
    entry: './app',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'scripts/[name]-[hash:5]-boundle.js',
      chunkFilename: '[name]-[hash:5].bundle.js',
      publicPath: './'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        },
        {
          test: /\.html$/,
          use:{
            loader: 'html-loader',
          }
        },
        {
          test: /\.js$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                plugins: isProd ? ['lodash'] : []
              }
            }
          ],
          exclude: /(node_modules)/
        },
        {
          test: /\.(scss|css)$/,
          use: [
            (isProd ? {loader: MiniCssExtractPlugin.loader, options:{publicPath: '../'}}:'vue-style-loader'),
            {
              loader: "css-loader",
              options: {
                minimize: true,
                sourceMap: isProd ? false : true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer'),
                  require('postcss-sprites')(spritesConfig)
                ]
              }
            },
            {
              loader: "sass-loader"
            }
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "[name]-[hash:5].min.[ext]",
                limit: 1024*10,
                outputPath: "images",
              } 
            },
            {
              loader: "img-loader"
            }
          ]
        },
        {
          test: /\.(eot|woff2?|ttf|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: "[name]-[hash:5].min.[ext]",
                limit: 1024*5,
                outputPath: "font",
              }
            }
          ]
        }
      ]
    },
    plugins: 
      isProd ? 
      [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
          filename: 'styles/[name]-[hash:5].css',
        }),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.join(ROOT_PATH, 'index.html'),
          minify: {
            collapseWhitespace: true
          }
        }),
        new LodashModuleReplacementPlugin,
        new CleanWwebpackPlugin(["dist"], {
          root: ROOT_PATH,
          verbose: true
        }),
        new BundleAnalyzerPlugin()
      ].concat(compress ? new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(js|css)$'),
        threshold: 10240,
        minRatio: 0.8
      }) : [])
      :
      [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
          filename: 'style-[hash:5].css'
        }),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.join(ROOT_PATH, 'index.html'),
          minify: {
            collapseWhitespace: true
          }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
      ],
    devServer: {
      port:8081,
      hot: true,
      publicPath: "/",
      contentBase: path.resolve(__dirname, "./dist"),
      proxy: {
        "/linkfin": {
          target: "http://localhost:34000",
          changeOrigin: true,
        }
      },
    historyApiFallback: true
    }
  }
}