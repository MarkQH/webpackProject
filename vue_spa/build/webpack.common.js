'use strice'
const { resolve } = require('path');
const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");
const merge = require("webpack-merge");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const generateConfig = (isProd) => {
  return {
    stats: {
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    },
    mode: isProd ? 'production' : 'development',
    entry: resolve(__dirname, '../app.js'),
    output: {
      filename: 'js/[name]_[hash:5].js',
      path: resolve(__dirname, '../dist')
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        },
        {
          oneOf: [
            {
              test: /\.(jpg|jpeg|png|gif)$/,
              loader: 'url-loader',
              options: {
                outputPath: 'images',
                limit: 8 * 1024,
                esModule: false,
                name: '[hash:10].[ext]'
              }
            },
            {
              test: /\.(eot|woff2?|ttf|svg)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    name: "[hash:10].[ext]",
                    limit: 5 * 1024,
                    outputPath: 'fonts'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
    ]
  };
};

module.exports = env => {
  const isProd = !!env.production;
  const config = (isProd ? prodConfig : devConfig);
  console.log(config);
  return merge(generateConfig(isProd), config);
}
