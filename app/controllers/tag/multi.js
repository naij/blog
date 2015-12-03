var util  = require('../../../lib/util');
var FError  = require('../../../lib/error');
var Tag   = require('../../models/tag');

module.exports = function *() {
  var tag = yield Tag.find().exec();

  this.body = {
    data: tag,
    info: {
      ok: true
    }
  } 
}