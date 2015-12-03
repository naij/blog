/**
 * 统一业务级错误处理中心：转换业务级错误提示
 * 应用级错误需要在 app.on('error') 事件上做
 */
var FError = require('../../lib/error');

module.exports = function *(next) {
  try {
    yield next
  } catch (error) {
    this.app.emit('error', error)

    if (/\/(api|manage)\/.*/.test(this.request.path)) {
      // json SyntaxError
      if (error.status === 400 && typeof error.body === 'string') {
        this.status = 400;
        this.body = {
          info: {
            ok: false,
            message: 'JSON 语法错误'
          }
        }
        return
      }
      // 自定义错误
      switch(error.name) {
        case 'FError':
          this.status = error.status;
          this.body = {
            info: {
              ok: false,
              message: error.message
            }
          }
          break
        // mongodb 操作错误
        case 'ValidationError':
          this.status = FError.MissingParameter;
          this.body = {
            info: {
              ok: false,
              message: error.errors
            }
          }
          break
        // mongoError E11000 唯一值
        case 'MongoError':
          if (error.code === 11000) {
            this.status = FError.InvalidArgument;
            this.body = {
              info: {
                ok: false,
                message: error.message.match(/\".*\"/)[0] + ' 已存在'
              }
            }
          }
          break
        case 'CastError':
          this.status = FError.InvalidArgument;
          this.body = {
            info: {
              ok: false,
              message: '无效 ' + error.path + ' ID'
            }
          }
          break
      }
    }
  }
}