/*
  使用dll技术，对某些库（如jquery、react、vue。。。）进行单独打包
*/
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { resolve } = require('path');
const webpack = require('webpack');
module.exports = {
  mode: 'production',
  entry: {
    /*
      最终打包生成的[name] --> vue
      ['vue] --> 要打包的库是vue
    */
    "vuetool": ['vue', 'vuex', 'vue-router','axios', 'lodash-es'],
  },
  output: {
    filename: '[name].dll.js',
    path: resolve(__dirname, '../dll'),
    library: '[name]_[hash]', // 打包的库里面向外暴露的内容叫什么名字
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: true,
      cleanOnceBeforeBuildPatterns: ['../dll'],
      dangerouslyAllowCleanPatternsOutsideProject: true
    }),
    // 打包生成一个manifest.json --> 提供和jquery的映射关系
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: resolve(__dirname, '../dll/manifest.json') // 输出的文件路径
    })
  ]
}