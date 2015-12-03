var config   = require('config')
var upyun  = require('upyun')
var path   = require('path')
var fs     = require('mz/fs')
var images   = require("images")
var thunkify = require('thunkify')
var util   = require('../../../lib/util')
var FError   = require('../../../lib/error')
var Pic    = require('../../models/pic')
var backname = config.upyunBuckname
var username = process.env.UPYUN_USERNAME
var password = process.env.UPYUN_PASSWORD

// 创建又拍云客户端
var upyunClient = new upyun(backname, username, password)

function upload(path, file, cb) {
  upyunClient.uploadFile(path, file, cb)
}

module.exports = function *() {
  var body = this.request.body
  var picPath = body.files.pic.path
  var picName = picPath.split('/')[1]
  picPath = path.resolve(picPath)

  // 读取上传的临时文件
  var file = yield fs.readFile(picPath)

  // 上传到upyun
  var upyunInfo = yield thunkify(upload)('/c/' + picName, file)

  // 获取图片尺寸
  var size = images(picPath).size()

  // 保存到数据库
  var pic = yield Pic.create({
    picPath: '/c/' + picName,
    picSize: size.width + 'x' + size.height
  })

  // 删除临时文件
  yield fs.unlink(picPath)

  this.body = {
    data: '',
    info: {
      ok: true
    }
  } 
}