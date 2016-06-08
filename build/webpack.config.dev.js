/**
开发用的webpack配置文件
**/

var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// src目录
var dir_src = path.join(__dirname, '../src');

module.exports = {
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    // 变量定义插件，定义的变量可以在任何页面拿出来用
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"dev"'
      }
    }),
    // 通过一些计算方式减少chunk的大小的插件
    new webpack.optimize.OccurenceOrderPlugin(),
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    // 提取合并Css
    new ExtractTextPlugin('bundle.css', {
      disable: false,
      allChunks: true,
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: dir_src
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }]
  }
};
