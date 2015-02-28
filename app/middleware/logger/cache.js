/**
 * Module dependencies.
 */

var logfilestream = require('logfilestream');
var util          = require('./util');
var Log           = require('./log');

function Cache(options) {
    this._debug = [];
    this._access = [];
    this._error = [];

    // 日志文件流
    var astream = logfilestream({
        logdir: options.dir || './logs',
        nameformat: '[access.]YYYY-MM-DD[.log]',
        mkdir: true
    });
    var estream = logfilestream({
        logdir: options.dir || './logs',
        nameformat: '[error.]YYYY-MM-DD[.log]',
        mkdir: true
    });

    // 控制台日志
    this.clog = new Log(options.level);
    // 访问日志
    this.alog = new Log(options.level, astream);
    // 错误日志
    this.elog = new Log(options.level, estream);
}

Cache.prototype = {
    debug: function () {
        var msg = util.format(arguments);
        this._debug.push(msg);
    },
    access: function () {
        var msg = util.format(arguments);
        this._access.push(msg);
    },
    error: function () {
        var msg = util.format(arguments);
        this._error.push(msg);
    },
    end: function () {
        this._debug.length && this.clog.debug(this._debug.join('\n'));
        this._access.length  && this.alog.info(this._access.join('\n'));
        this._error.length && this.elog.error(this._error.join('\n'));
    }
}

module.exports = Cache;