/**
 * 登陆过滤器
 * @param  {onject} options config那边传过来的配置
 * @param  {object} app     app对象
 * @return {object}         中间件
 */

'use strict'

module.exports = (options, app) => {
  return function* auth(next) {
    // 从session取用户信息
    this.user = this.session.user

    // 免登path校验
    if (!this.user) {
      if (this.request.path && options.unInterceptUrls.indexOf(this.request.path) == -1) {
        return this.renderJSON({
          code: 403,
          message: 'LOGIN REQUIRED'
        })
      }
    }
    yield next
  }
}