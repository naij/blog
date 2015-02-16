/**
 * 接口是否需要登录验证中间件
 */
var FError = require('../../lib/error');

module.exports = function *(next) {
    // 过滤 manage 路由下的所有接口
    if (/^\/manage\/.+$/.test(this.request.path)) {
        if (!this.session || !this.session.user) {
            throw FError.NotAuthorizedError();
        }
    }

    yield next;
}