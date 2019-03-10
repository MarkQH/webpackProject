'use strice'

const path = require('path')
const fs = require('fs')
const merge = require("webpack-merge")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const productionConfig = require("./webpack.prod")
const developmentConfig = require("./webpack.dev")
const pkg = require('../package.json')

const ROOT_PATH = path.resolve(__dirname, '..')
const ENTRY_PATH = path.resolve(__dirname, '../src/js/')
const PAGES_PATH = path.resolve(__dirname, '../views/')



const entries = () => {
  let jsPaths = {}
  let files = fs.readdirSync(ENTRY_PATH)
  for (let file of files){
    if(fs.statSync(path.join(ENTRY_PATH, file)).isFile()){
      let name = path.parse(file).name
      jsPaths[name] = path.join(ENTRY_PATH, name)
    }
  }
  return jsPaths;
}

const views = () => {
  let pages = []
  let files = fs.readdirSync(PAGES_PATH)
  for ( file of files ) {
    if (fs.statSync(path.join(PAGES_PATH, file)).isFile()) {
      let name = path.parse(file).name
      let ext = path.parse(file).ext
      pages.push(new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: path.join(PAGES_PATH, `${name}${ext}`),
        chunks: [`common`,`${name}`],
        minify: {
          collapseWhitespace: true
        }
      }))
    }
  }
  return pages;
}

const generateConfig = (isProd) => {

  let spritesConfig = {
    spritePath: "images",
    filterBy: function (image) {
      if (image.url.indexOf('/images/sprites/') === -1) {
          return Promise.reject()
      }
      return Promise.resolve()
    },
  }

  let scriptLoader = [
    {
      loader: "babel-loader",
      options: {
        plugins: isProd ? ['lodash'] : []
      }
    }
  ]

  let styleLoader = [
    isProd ? 
    { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../'} }
    :
    'vue-style-loader',
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
  ]

  let vueLoader = [
    {
      loader: "vue-loader"
    }
  ]

  let pugLoader = [
    {
      loader: "pug-plain-loader",
    }
  ]
  
  let imageLoader = [
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

  let fontLoader = [
    {
      loader: 'url-loader',
      options: {
        name: "[name]-[hash:5].min.[ext]",
        limit: 1024*5,
        outputPath: "font",
      }
    }
  ]

  return {
    entry: entries(),
    output: {
      path: path.resolve(ROOT_PATH, 'dist'),
      publicPath: './',
      filename: "scripts/[name]-[hash:5]-boundle.js",
      chunkFilename: "[name]-[hash:5].chunk.js"
    },
    resolve: {
      alias: {
        '@': ROOT_PATH
      }
    },
    module: {
      rules: [
        { test: /\.vue$/, use: vueLoader },
        { test: /\.pug$/, use: pugLoader },
        { test: /\.js$/, use: scriptLoader },
        { test: /\.(scss|css)$/, use: styleLoader },
        { test: /\.(png|jpg|jpeg|gif)$/, use: imageLoader },
        { test: /\.(eot|woff2?|ttf|svg)$/, use: fontLoader },
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
    ].concat(views())
  }
}

module.exports = env => {

  let isProd = !!env.production

  let config = isProd ? productionConfig : developmentConfig

  return merge(generateConfig(isProd), config)
}
