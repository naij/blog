var koa     = require('koa')
var session = require('koa-session')
var body    = require('koa-body')
var views   = require('koa-views')
var jsonp   = require('koa-safe-jsonp')
var serve   = require('koa-static')
var favicon = require('koa-favicon')
var record  = require('koa-logs-full')
var path    = require('path')
var config  = require('config')
var routes  = require('./app/routes/')
var models  = require('./app/models/')
var auth    = require('./app/middleware/auth')
var error   = require('./app/middleware/error')
var logger  = require('./app/middleware/logger')
var app     = koa()

app.use(error)

app.use(logger(app, {
  level: config.logLevel,
  dir: './logs'
}))

// 是否前端有放代理服务器（nginx）
app.proxy = config.proxy

app.keys = ['naij']
app.use(session(app))

jsonp(app, {
  callback: '_callback',
  limit: 50
})

app.use(views('app/views', {
  default: 'jade'
}))

app.use(function *(next) {
  this.locals.config = config
  yield next
})

app.use(favicon(__dirname + '/public/favicon.ico'))

app.use(serve('./public'))

app.use(auth)

app.use(body({
  multipart: true,
  formidable: {
    uploadDir: './tmp',
    keepExtensions: true
  }
}))

routes(app)

app.listen(config.port, function() {
  console.log('app running ' + config.port +' port')
})

module.exports = app