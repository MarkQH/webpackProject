'use strice'
const { resolve } = require('path');
const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");
const merge = require("webpack-merge");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader', // css 兼容性处理
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-preset-env')() // 匹配package.json 文件的browerslist
      ]
    }
  },
];
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
        { test: /\.css$/,
          use: [...commonCssLoader]
        },
        {
          test: /\.less$/,
          use: [...commonCssLoader, 'less-loader']
        },
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
      new MiniCssExtractPlugin({
        filename: 'css/[name]_[hash].css'
      }),
    ]
  };
};

module.exports = env => {
  const isProd = !!env.production;
  const config = (isProd ? prodConfig : devConfig);
  console.log(generateConfig(isProd), config);
  return merge(generateConfig(isProd), config);
}
