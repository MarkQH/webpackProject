const fs = require('fs');
const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");
const productionConfig = require("./webpack.prod.conf");
const developmentConfig = require("./webpack.dev.conf");

const ROOT_PATH = path.join(__dirname, '..');
console.log(ROOT_PATH);
const ENTRY_PATH = path.join(ROOT_PATH, 'src', 'js');
console.log(ENTRY_PATH);