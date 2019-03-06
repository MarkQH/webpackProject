const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");


const productionConfig = require("./webpack.prod.conf");
const developmentConfig = require("./webpack.dev.conf");

const generateConfig = env => {

  let spritesConfig = {
    spritePath: "../dist/static/images"
  }

  let scriptLoader = [
    {
      loader: "babel-loader"
    }
  ];

  let cssLoader = [
    {
      loader: "css-loader",
      options: {
        minimize: true,
        sourceMap: env === "development" ? true : false
      }
    },
    {
      loader: "sass-loader"
    },
    {
      loader: "postcss-loader",
      options: {
        ident: 'postcss',
        plugins: [require('postcss-sprites')(spritesConfig)]
      }
    }
  ];

  let styleLoader = env === "production" ? ExtractTextPlugin.extract({
    fallback: {
      loader: "style-loader"
    },
    use: cssLoader,
  }) : cssLoader;

  let imgloader = [
    {
      loader: "url-loader",
      options: {
        name: "[name]-[hash:5].min.[ext]",
        limit: 1024*10,
        publicPath: "assets/images/",
        outputPath: "assets/images/",
      } 
    },
    {
      loader: "img-loader",
      options: {
        plugins: [
          require("imagemin-pngquant")({})
        ]
      }
    }
  ];

  let fontLoader = [
    {
      loader: "url-loader",
      options: {
        name: "[name]-[hash:5].min.[ext]",
        limit: 1024*5,
        pubilcPath: "assets/fonts/",
        outputPath: "assets/fonts/",
      }
    }
  ]

  return {
    entry: { app: "./app.js"},
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, "../dist"),
      filename: "assets/js/[name]-[hash:5].bundle.js",
      chunkFilename: "[name]-[hash:5].chunk.js"
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /(node_modules)/, use: scriptLoader },
        { test: /\.(scss|css)$/, use: styleLoader },
        { test: /\.(png|jpg|jpeg|gif)$/, use: imgloader },
        { test: /\.(eot|woff2?|ttf|svg)$/, use: fontLoader },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "../src", "index.html"),
        chunks: ["app"],
        minify: {
          collapseWhitespace: true
        }
      }),
    ]
  }
}

module.exports = env => {
  let config = env === "production" ? productionConfig : developmentConfig;
  return merge(generateConfig(env), config);
};
