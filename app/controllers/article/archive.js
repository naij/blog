var util  = require('../../../lib/util')
var FError  = require('../../../lib/error')
var Article = require('../../models/article')

module.exports = function *(id) {
  var article = yield Article.aggregate({
    $group: {
      _id: {
        year: { $year: "$update" },
        month: { $month: "$update" }
      },
      list: {
        $push: {
          "id": "$_id",
          "title": "$title",
          "type": "$type"
        }
      }
    }
  }, {
    $project: {
      _id: 0,
      time: "$_id",
      list: "$list"
    }
  }).exec()

  this.body = {
    data: article,
    info: {
      ok: true
    }
  } 
}