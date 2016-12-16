/**
 * cdn前缀
 */
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
 * 登陆校验中间件
 */
exports.auth = {
  unInterceptUrls: [
    '/',
    '/debug',
    '/api/pubinfo',
    '/api/login',
    '/api/logout',
    '/api/article/list',
    '/api/article/detail',
    '/api/article/archive',
    '/api/article/bytag',
    '/api/article/taggroup',
    '/api/tag/list'
  ].concat([
    '/pages/article/list',
    '/pages/about/about',
    '/pages/tags/tags',
    '/pages/archive/archive',
    '/manage/login'
  ])
}

/**
 * 加载的中间件
 */
exports.middleware = [
  'auth',
  'notfoundoverwrite'
]