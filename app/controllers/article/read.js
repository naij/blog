var util    = require('../../../lib/util');
var FError  = require('../../../lib/error');
var Article = require('../../models/article');

module.exports = function *(id) {
    var articles;

    article = yield Article.find({_id: id}).exec();

    // 格式化发布日期字段
    article.publishDate = util.formatDate(article.update);

    this.body = {
        data: article,
        info: {
            ok: true
        }
    } 
}