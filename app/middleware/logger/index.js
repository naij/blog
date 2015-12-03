/**
 * Module dependencies.
 */

var Log   = require('./log');
var Cache = require('./cache');
var util  = require('./util');

/**
 * Expose logger.
 */
module.exports = logger;


function logger(app, options) {

  var globalLogger = new Log(options.level);

  // 监听全局的error事件，koa会检查是否有监听error事件
  // 如果有就使用自定义的，如果没有则使用内部默认的事件监听
  app.on('error',function (err) {
    var msg = err.stack || err.toString();
    if (!err.handled) {
      globalLogger.debug('{{#red}}%s{{/red}}', msg);
    }
  });

  // 添加全局可用的consolelog
  global.globalLogger = globalLogger;


  return function *(next) {
    var ctx = this;

    // 静态资源直接跳过
    if (util.static(ctx.path)) {
      return yield next;
    }

    var start = new Date();
    var cache = new Cache(options);

    // 控制台日志
    cache.debug('{{#yellow}}<--{{/yellow}} {{#cyan}}%s{{/cyan}} {{#gray}}%s{{/gray}}', 
      ctx.method,
      ctx.url);
    if (ctx.query) {
      cache.debug('  {{#green}}query{{/green}}: {{#gray}}%s{{/gray}}', 
        JSON.stringify(ctx.query));
    }
    if (ctx.request.body) {
      cache.debug('  {{#green}}body{{/green}}: {{#gray}}%s{{/gray}}', 
        JSON.stringify(ctx.request.body));
    }

    try {
      yield next;
    } catch (err) {
      var msg = err.stack || err.toString();
      // 控制台日志
      cache.debug('{{#red}}%s{{/red}}', msg);
      // 错误日志
      cache.error('query url: %s', ctx.url);
      cache.error(msg);
      // 输出所有日志
      cache.end()

      // 标示此错误已经处理过了
      // 全局错误监听跳过此错误
      err.handled = true;

      // 将错误抛出，以便其他中间件可以捕获
      throw err;
    }

    // 访问日志
    // :remote-addr - ":method :url" :status :content-length ":referrer" ":user-agent"
    cache.access('%s - "%s %s" %s %s "%s" "%s"', 
      this.app.proxy ? ctx.ips : ctx.ip,
      ctx.method,
      ctx.url,
      ctx.status,
      ctx.length,
      ctx.headers['referer'],
      ctx.headers['user-agent']);

    var res = ctx.res;

    res.once('finish', done);
    res.once('close', done);

    function done() {
      res.removeListener('finish', done);
      res.removeListener('close', done);

      // 控制台日志
      cache.debug('{{#green}}-->{{/green}} {{#cyan}}%s{{/cyan}} {{#gray}}%s{{/gray}} {{#green}}%s{{/green}} {{#green}}%s{{/green}}', 
        ctx.method,
        ctx.url,
        ctx.status,
        util.time(start));
      // 输出所有日志
      cache.end();
    }
  }
}