var util  = require('../../../lib/util')
var FError  = require('../../../lib/error')
var Article = require('../../models/article')

module.exports = function *(id) {
  var tag = yield Article.aggregate({
    $group: {
      _id: "$tag", 
      count: {
        $sum: 1
      }
    }
  }, {
    $project: {
      _id: 0,
      tag: "$_id",
      count: "$count"
    }
  }).exec()

  this.body = {
    data: tag,
    info: {
      ok: true
    }
  } 
}