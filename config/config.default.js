/**
 * cdn前缀
 */

exports.host = 'localhost:7001'

exports.staticCDN = '/public'

exports.siteFile = {
  '/favicon.ico': '/public/favicon.ico',
}

exports.security = {
  ctoken: {
    enable: true,
    ignore: [/api/]
  },
  csrf: {
    enable: true,
    ignore:[/api/]
  }
}

/**
 * 日志级别
 */
exports.logger = {
  stdoutLevel: "DEBUG"
}

/**
 * session配置
 */
exports.session = {
  store: "cookie",
  maxAge: 365 * 24 * 3600 * 1000
}

/**
 * 数据库信息
 */
exports.database = {
  database: "blog",
  host: "127.0.0.1",
  dialect: "mysql",
  port: "3306"
}

/**
 * 404页面配置
 */
exports.notfound = {
  pageUrl: '/404',
  enableRedirect: true,
}

/**
 * 登陆校验中间件
 */
exports.auth = {
  unInterceptUrls: [
    '/api/pubinfo',
    '/api/login',
    '/api/logout',
    '/api/article/list',
    '/api/article/detail',
    '/api/article/archive',
    '/api/article/bytag',
    '/api/article/taggroup',
    '/api/feed/rss',
    '/api/tag/list'
  ]
}

/**
 * 加载的中间件
 */
exports.middleware = [
  'auth'
]