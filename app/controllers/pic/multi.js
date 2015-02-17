var config  = require('config');
var util    = require('../../../lib/util');
var FError  = require('../../../lib/error');
var Pic     = require('../../models/pic');

module.exports = function *() {
    var startTime = this.query.startTime;
    var endTime = this.query.endTime;
    var pic = yield Pic.find({"uploadTime": {$gte: startTime,$lte: endTime}}).exec();

    var list = [];

    for (var i = 0; i < pic.length; i++) {
        var temp = pic[i].toJSON();
        temp['uploadTime'] = util.formatDate(temp.uploadTime);
        temp.picPath = config.upyunPath + temp.picPath;
        list.push(temp);
    }

    this.body = {
        data: list,
        info: {
            ok: true
        }
    } 
}