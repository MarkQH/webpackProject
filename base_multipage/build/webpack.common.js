const fs = require('fs');
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const productionConfig = require("./webpack.prod.conf");
const developmentConfig = require("./webpack.dev.conf");
const ROOT_PATH = path.join(__dirname, '..');
const ENTRY_PATH = path.join(ROOT_PATH, 'src', 'js');
const PAGES_PATH = path.join(ROOT_PATH, "src", "views");

const entries = () => {
  let jsPaths = {};
  let files = fs.readdirSync(ENTRY_PATH);
  for (let file of files){
    if(fs.statSync(path.join(ENTRY_PATH, file)).isFile()){
      let name = path.parse(file).name;
      jsPaths[name] = path.join(ENTRY_PATH, name);
    }
  }
  return jsPaths;
}

const views = () => {
  let pages = [];
  let files = fs.readdirSync(PAGES_PATH);
  for ( file of files ) {
    if (fs.statSync(path.join(PAGES_PATH, file)).isFile()) {
      let name = path.parse(file).name;
      let ext = path.parse(file).ext;
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

const generateConfig = env => {

  let spritesConfig = {
    spritePath: "../dist/images",
    filterBy: function (image) {
      if (image.url.indexOf('/images/sprites/') === -1) {
          return Promise.reject();
      }
      return Promise.resolve();
    },
  }

  let htmlLoader = [
    {
      loader: "html-loader",
    }
  ]

  let scriptLoader = [
    {
      loader: "babel-loader",
      options: {
        plugins: env === "development" ? [] : ['lodash']
      }
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
  ];

  let styleLoader = ExtractTextPlugin.extract({
    fallback: {
      loader: "style-loader"
    },
    use: cssLoader,
    publicPath: '../../'
  })

  let imgloader = [
    {
      loader: "url-loader",
      options: {
        name: "[name]-[hash:5].min.[ext]",
        limit: 1024*10,
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
    entry: entries(),
    output: {
      path: path.join(__dirname, "../dist"),
      publicPath: './',
      filename: "assets/js/[name]-[hash:5].bundle.js",
      chunkFilename: "[name]-[hash:5].chunk.js"
    },
    module: {
      rules: [
        { test: /\.html$/, use: htmlLoader },
        { test: /\.js$/, exclude: /(node_modules)/, use: scriptLoader },
        { test: /\.(scss|css)$/, use: styleLoader },
        { test: /\.(png|jpg|jpeg|gif)$/, use: imgloader },
        { test: /\.(eot|woff2?|ttf|svg)$/, use: fontLoader },
      ]
    },
    plugins: [].concat(views())
  }
}

module.exports = env => {
  let config = env === "production" ? productionConfig : developmentConfig;
  return merge(generateConfig(env), config);
};
