var markdown = require('markdown-js');
var util     = require('../../../lib/util');
var FError   = require('../../../lib/error');
var Article  = require('../../models/article');

module.exports = function *() {
    var body = this.request.body;
    var md = body.content;
    var html = markdown.makeHtml(md);

    var article = yield Article.create({
        type: body.type,
        tag: body.tag,
        title: body.title,
        content: html,
        markdown: md.replace(/&/g, "&amp;"),
        draft: body.draft
    });

    this.body = {
        data: article,
        info: {
            ok: true
        }
    } 
}