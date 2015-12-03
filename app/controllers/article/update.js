var markdown = require('markdown-js');
var util   = require('../../../lib/util');
var FError   = require('../../../lib/error');
var Article  = require('../../models/article');

module.exports = function *(id) {
  var body = this.request.body;
  var md = body.content;
  var html = markdown.makeHtml(md);

  var article = yield Article.findOneAndUpdate({_id: id}, {
    title: body.title,
    content: html,
    markdown: md.replace(/&/g, "&amp;"),
    draft: body.draft
  }).exec();

  this.body = {
    data: article,
    info: {
      ok: true
    }
  } 
}