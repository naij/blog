var config   = require('config');
var sanitize = require('validator');
var Util     = require('../../../lib/util');
var FError   = require('../../../lib/error');
var User     = require('../../models/user');

module.exports = function *() {
    var body = this.request.body;
    var loginname = sanitize.trim(body.loginname);
    var password = sanitize.trim(body.password);

    if (!loginname || !password) {
        this.body = {
            data: {
                error: '用户名或者密码错误'
            },
            info: {
                ok: true
            }
        };

        return;
    }

    var user = yield User.findOne({'loginname': loginname}).exec();

    if (!user) {
        this.body = {
            data: {
                error: '用户不存在。'
            },
            info: {
                ok: true
            }
        };
    } else if (password !== user.password) {
        this.body = {
            data: {
                error: '密码错误。'
            },
            info: {
                ok: true
            }
        };
    } else {
        genSession.call(this, user);

        this.body = {
            info: {
                ok: true
            }
        }
    }
}

function genSession(user) {
    var authToken = Util.encrypt(user._id + '|' + user.loginname + '|' + user.password, config.sessionSecret);

    //cookie 有效期30天
    this.cookies.set(config.cookieName, authToken, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30
    }); 
}