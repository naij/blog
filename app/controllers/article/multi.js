var util    = require('../../../lib/util');
var FError  = require('../../../lib/error');
var Article = require('../../models/article');

module.exports = function *() {
    var type = this.query.type;
    var list = [];
    var articles;

    articles = yield Article.find({type: type}).sort({"_id": -1}).exec();

    // 格式化发布日期字段
    for (var i = 0; i < articles.length; i++) {
        var temp = articles[i].toJSON();
        temp['publishDate'] = util.formatDate(temp.update);
        list.push(temp);
    }

    this.body = {
        data: list,
        info: {
            ok: true
        }
    } 
}