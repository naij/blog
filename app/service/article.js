'use strict'

const _ = require('lodash')
const markdown = require('markdown-js')
const { Service } = require('egg')

class ArticleService extends Service {
  async list(opt) {
    let queryOpt = {
      order: 'createdAt DESC'
    }
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

    let articles = await this.ctx.app.models.Article.findAll(queryOpt)
    return articles
  }

  async detail(id) {
    let article = await this.ctx.app.models.Article.findById(id)
    return article
  }

  async readbytag(tag) {
    let articles = await this.ctx.app.models.Article.findAll({
      where: {
        tag: tag,
        status: 1
      }
    })
    return articles
  }

  async taggroup() {
    let tags = await this.ctx.app.models.Article.findAll({
      attributes: [
        ['tag', 'tagName'],
        [this.ctx.app.models.sequelize.fn('count', 'tag'), 'count']
      ],
      where: {
        status: 1
      },
      group: ['tag']
    })
    return tags
  }
  
  async archive() {
    let articles = await this.ctx.app.models.Article.findAll({
      attributes: [
        'id',
        'title',
        'type',
        'createdAt',
        [this.ctx.app.models.sequelize.fn('date_format', this.ctx.app.models.sequelize.col('createdAt'), '%Y'), 'y']
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
  }
}

module.exports = ArticleService