'use strict';

const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
  return {
    mode: env.production? 'production' : 'development',
    devtool: env.production ? 'source-maps' : 'eval',
    entry: './app',
    output: {
      path: './dist',
      filename: '[name]-[hash:5]-boundle.js',
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use:{
            loader: 'html-loader',
          }
        },
        {
          test: /\.js$/,
          use: {
            
          }
        }
      ]
    }
    
  }
}