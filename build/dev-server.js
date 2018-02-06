// 检查node npm version.
require('./check-versions')();


var log4js = require('log4js');

log4js.configure({
 appenders: {
   console: { type: 'console' },
   file: { type: 'file', filename: 'logs/cheese.log' }
 },
 categories: {
   cheese: { appenders: ['file'], level: 'info' },
   default: { appenders: ['console'], level: 'info' }
 }
});

var logger = log4js.getLogger('cheese');

var config = require('../config');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var opn = require('opn');
var proxyMiddleWare = require('http-proxy-middleware');
var webpackConfig = require('./webpack.dev.conf');

var port = process.env.PORT || config.dev.port;

var proxyTable = config.dev.proxyTable;

var app = express()

var appData = require('../data.json');
var seller = appData.seller;

var goods = appData.goods;

var ratings = appData.ratings;

var apiRouter = express.Router();

apiRouter.get('/seller', function(req, res) {
  res.json({
    errno: 0,
    data: seller
  })
});


apiRouter.get('/goods', function(req, res) {
  res.json({
    errno: 0,
    data: goods
  })
});

apiRouter.get('/ratings', function(req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
});

app.use(log4js.connectLogger(logger, { level: 'debug', format: ':method :url'}));

app.use('/api', apiRouter);

logger.debug("hello world.")

var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publickPath: webpackConfig.output.publickPath,
  stats: {
    colors: true,
    chunks: false
  }
});

var hotMiddleware = require('webpack-hot-middleware')(compiler);

compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb()
  })
})

Object.keys(proxyTable).forEach(function(context) {
  var options = proxyTable[context];

  if (typeof options === 'string') {
    options = { target: options };
  }

  app.use(proxyMiddleWare(context, options));
})

app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);

app.use(hotMiddleware);

var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);

app.use(staticPath, express.static('./static'));

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  var uri = 'http://localhost:' + port;
  console.log("listen at " + uri + '\n');

  if (process.env.NODE_ENV !== 'testing') {
    opn(uri);
  }

});
