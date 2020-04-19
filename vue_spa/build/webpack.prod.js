const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');
const { resolve } = require('path');
module.exports = {
  mode: 'production', // 生产环境会自动压缩js代码
  // externals通过CDN引入的、拒绝jQuery被打包进来
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                /*
                  开启多进程打包
                  进程启动大概为600ms,进程通信也有开销
                  只有工作消耗时间比较成，才需要多进程打包
                */
                loader: 'thread-loader',
                options: {
                  workers: 2 // 进程数
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage', // a按需加载
                        corejs: {
                          version: 3 // 指定core-js版本
                        },
                        targets: { // 指定兼容做到哪个版本的浏览器
                          chrome: '60',
                          firefox: '50',
                          ie: '9',
                          safari: '10',
                          edge: '17'
                        }
                      }
                    ]
                  ],
                  cacheDirectory: true
                }
              }
            ],
          }
        ]
      }
    ]
  },
  plugins: [
    
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../index.html'),
      filename: 'ss.html',
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1. 帮助serverWorker快速启动
        2. 删除旧的serviceworker
        生成一个serviceworker配置文件
      */
      clientsClaim: true,
      skipWaiting: true,
    }),
    // 指定哪些库不参与打包，同时使用时的名称也得变
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, '../dll/manifest.json')
    }),
    // 将某个文件打包输出，并在html中自动引入该文件
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, '../dll/*.js')
    }),
    new CleanWebpackPlugin({
      verbose: true
    }),
  ],
  /*
    1。可以将node_modules 中代码单独打包一个chunk 最终输出
    2. 自动分析多入口chunk中，有没有公共文件，如果有就打包成一个单独的chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}