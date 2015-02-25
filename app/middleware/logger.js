function Log() {
    this.debug = [];
    this.access = [];
    this.err = [];
    this.format = {
        'combined': ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
        'common': ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length]',
        'default': ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
        'short': ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
        'tiny': ':method :url :status :res[content-length] - :response-time ms'
    }
}

Log.prototype.dev = function() {
    this.debug.push(arguments);
};
Log.prototype.access = function(msg) {
    this.access.push(msg);
};
Log.prototype.err = function(err) {
    var msg = err.stack || err.toString();
    msg = msg.replace(/^/gm, '  ');
    this.err.push(msg);
};
Log.prototype.end = function () {
    for (var i = 0; i< this.debug.length; i++) {
        console.log.apply(null, this.debug[i]);
    }
}
Log.prototype.compile = function (format) {
    if (typeof format === 'function') {
        // already compiled
        return format;
    }

    if (typeof format !== 'string') {
        throw new TypeError('argument format must be a function or string');
    }

    var fmt = format.replace(/"/g, '\\"')
    var js = '  return "' + fmt.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function (_, name, arg) {
            return '"\n    + (tokens["' + name + '"](req, res, "' + arg + '") || "-") + "';
        }) + '";';

    return new Function('tokens, req, res', js);
}

module.exports = function (app) {
    app.on('error',function (err) {
        var msg = err.stack || err.toString();
        if (!err.handled) {
            console.error(msg.replace(/^/gm, '  '));
        }
    })

    var i = 0;


    return function *logger(next) {
        var start = new Date;
        var log = new Log();

        if (i < 1) {
            console.log(log.compile(log.format.combined).toString());
            i++;
        }


        log.dev('  \x1B[90m<-- \x1B[;1m%s\x1B[0;90m %s\x1B[0m', this.method, this.url);
        // log.access();

        try {
            yield next;
        } catch (err) {
            log.err(err);

            // 标示此错误已经处理
            // 全局错误监听跳过此错误
            err.handled = true;

            // 将错误抛出，以便其他中间件可以捕获
            throw err;
        }

        var ctx = this;
        var res = this.res;

        var onfinish = done.bind(null, 'finish');
        var onclose = done.bind(null, 'close');

        res.once('finish', onfinish);
        res.once('close', onclose);

        function done() {
            res.removeListener('finish', onfinish);
            res.removeListener('close', onclose);

            log.dev('  \x1B[90m--> \x1B[;1m%s\x1B[0;90m %s\x1B[0m', ctx.method, ctx.url);
            log.end();
        }
    }
}