'use strict'

let _ = require('lodash')
let markdown = require('markdown-js')

module.exports = app => {
  class Article extends app.Service {
    constructor(ctx) {
      super(ctx)
    }
    * list(type) {
      let articles = yield this.app.models.Article.findAll({
        where: {
          type: type,
          status: 1
        }
      })
      return articles
    }
    * full(type) {
      let articles = yield this.app.models.Article.findAll({
        where: {
          type: type
        }
      })
      return articles
    }
    * detail(id) {
      let article = yield this.app.models.Article.findById(id)
      return article
    }
    * readbytag(tag) {
      let articles = yield this.app.models.Article.findAll({
        where: {
          tag: tag,
          status: 1
        }
      })
      return articles
    }
    * taggroup() {
      let tags = yield this.app.models.Article.findAll({
        attributes: [
          ['tag', 'tagName'],
          [this.app.models.sequelize.fn('count', 'tag'), 'count']
        ],
        where: {
          status: 1
        },
        group: ['tag']
      })
      return tags
    }
    * archive() {
      let article = yield this.app.models.Article.findAll({
        group: ['createdAt']
      })
      return article
    }
    * create(postData) {
      let md = postData.content
      let html = markdown.makeHtml(md)

      let article = yield this.app.models.Article.create({
        type: postData.type,
        tag: postData.tag,
        title: postData.title,
        content: html,
        markdown: md.replace(/&/g, "&amp;"),
        status: postData.draft ? 0 : 1
      })

      return article
    }
    * update(postData) {
      let md = postData.content
      let html = markdown.makeHtml(md)

      let article = yield this.app.models.Article.update({
        title: postData.title,
        content: html,
        markdown: md.replace(/&/g, "&amp;"),
        status: postData.draft ? 0 : 1
      }, {
        where: {
          id: postData.id
        }
      })

      return article
    }
    * remove(postData) {
      let article = yield this.app.models.Article.update({
        status: 2
      }, {
        where: {
          id: postData.id
        }
      })
      return article
    }
  }

  return Article
}