/**
 * 用户访问日志
 * @param  {onject} options config那边传过来的配置
 * @param  {object} app     app对象
 * @return {object}         中间件
 */

'use strict'

let _ = require('lodash')
let path = require('path')
let moment = require('moment')
let excludeRequestLogExts = [ 
  '.js',
  '.css',
  '.png',
  '.svg',
  '.gif',
  '.jpg',
  '.ico'
]

module.exports = (options, app) => {
  return async function logger(ctx, next) {
    await next()

    let requestExt = path.extname(ctx.path)
    if (excludeRequestLogExts.indexOf(requestExt) >= 0) {
      return
    }
    let runtime = Date.now() - ctx.starttime

    let params = ''

    if (!_.isEmpty(ctx.query)) {
      params += 'query: ' + JSON.stringify(ctx.query)
    }
    if (!_.isEmpty(ctx.request.body)) {
      if (params) {
        params += ' '
      }
      params += 'body:' + JSON.stringify(ctx.request.body)
    }

    ctx.logger.info(`${params} status ${ctx.status} (${runtime}ms)`)
  }
}