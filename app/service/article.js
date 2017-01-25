'use strict'

let _ = require('lodash')
let markdown = require('markdown-js')

module.exports = app => {
  class Article extends app.Service {
    constructor(ctx) {
      super(ctx)
    }
    * list(opt) {
      let queryOpt = {}
      let whereOpt = {
        status: 1
      }

      if (opt.type) {
        whereOpt.type = opt.type
      }

      if (opt.limit) {
        queryOpt.limit = opt.limit
      }

      queryOpt.where = whereOpt

      let articles = yield this.app.models.Article.findAll(queryOpt)
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
      let articles = yield this.app.models.Article.findAll({
        attributes: [
          'id',
          'title',
          'type',
          'createdAt',
          [this.app.models.sequelize.fn('date_format', this.app.models.sequelize.col('createdAt'), '%Y'), 'y']
        ],
        where: {
          status: 1
        },
        raw: true,
        order: 'createdAt DESC'
      })

      let archiveList = []
      for (let i = 0; i < articles.length;) {
        let count = 0
        let obj = {
          y: articles[i].y,
          list: []
        }
        for (let j = i; j < articles.length; j++) {
          if (articles[i].y == articles[j].y) {
            obj.list.push(articles[j])
            count ++
          }
        }
        archiveList.push(obj)
        i += count
      }
      return archiveList
    }
  }

  return Article
}