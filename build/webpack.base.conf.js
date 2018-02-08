var path = require('path');
var config = require('../config');
var utils = require('./utils');
var projectRoot = path.resolve(__dirname, '../');

var env = process.env.NODE_ENV;

var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap);
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap);
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

// var stylus_plugin = require('stylus_plugin');

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', 'styl'],
    modules: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'common': path.resolve(__dirname, '../src/common')
    }
  },
  resolveLoader: {
    modules: [path.join(__dirname, "../node_modules")]
  },
  module: {
    rules: [{
        enforce: 'pre',
        test: /\.vue$/,
        include: projectRoot,
        use: [{
          loader: 'eslint-loader',
          options: {
            cache: true,
            formatter: require('eslint-friendly-formatter')
          }
        }],
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'eslint-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }, {
        test: /\.js$/,
        use: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        }]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
          // {
          //   loader: 'stylus-loader',
          //   options: {
          //     use: [stylus_plugin()]
          //   }
          // }
        ]
      }
    ]
  }
  // vue:{
  //   loaders: utils.cssLoaders({sourceMap: useCssSourceMap}),
  //   postcss:[
  //   require('autoprefixer')({
  //     browsers:['last 2 versions']
  //   })
  //   ]
  // }
}
