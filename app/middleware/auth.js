/**
 * 接口是否需要登录验证中间件
 */
var crypto = require('crypto');
var config = require('config');
var FError = require('../../lib/error');
var Util   = require('../../lib/util');
var User   = require('../models/user');

module.exports = function *(next) {
    var cookie = this.cookies.get(config.cookieName);

    if (cookie && !this.session.user) {
        var authToken = Util.decrypt(cookie, config.sessionSecret);
        var userId = authToken.split('|')[0];
        var user = yield User.findOne({_id: userId}).exec();

        if (user) {
            this.session.user = user.loginname;
        }
    }

    // 过滤 manage 路由下的所有接口
    if (/^\/manage\/.+$/.test(this.request.path)) {
        if (!this.session.user) {
            throw FError.NotAuthorizedError();
        }
    }

    yield next;
}