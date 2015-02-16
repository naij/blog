var util    = require('../../../lib/util');
var FError  = require('../../../lib/error');
var Article = require('../../models/article');

module.exports = function *(id) {
    var articles;

    article = yield Article.findOne({_id: id}).exec();

    this.body = {
        data: article,
        info: {
            ok: true
        }
    } 
}