var util  = require('../../../lib/util')
var FError  = require('../../../lib/error')
var Article = require('../../models/article')

module.exports = function *(tag) {
  var articles

  articles = yield Article.find({tag: tag}).exec()

  // 格式化发布日期字段
  var list = []
  for (var i = 0; i < articles.length; i++) {
    var temp = articles[i].toJSON()
    temp['publishDate'] = util.formatDate(temp.update)
    list.push(temp)
  }

  this.body = {
    data: list,
    info: {
      ok: true
    }
  } 
}