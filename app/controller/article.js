'use strict'

const _ = require('lodash')
const { Controller } = require('egg')

class ArticleController extends Controller {

  async list() {
    let type = this.query.type
    let articles = await this.service.article.list({type: type})
    return this.renderJSON({
      code: 200,
      data: articles
    })
  }

  async detail() {
    let id = this.query.id
    let article = await this.service.article.detail(id)
    return this.renderJSON({
      code: 200,
      data: article
    })
  }

  async readbytag() {
    let tag = this.query.tag
    let articles = await this.service.article.readbytag(tag)
    return this.renderJSON({
      code: 200,
      data: articles
    })
  }

  async taggroup() {
    let tags = await this.service.article.taggroup()
    return this.renderJSON({
      code: 200,
      data: tags
    })
  }

  async archive() {
    let articles = await this.service.article.archive()
    return this.renderJSON({
      code: 200,
      data: articles
    })
  }

  async rss() {
    let feed = this.feed
    let articles = await this.service.article.list({
      limit: 20
    })

    _.each(articles, (item) => {
      feed.item({
        title: item.title,
        url: 'http://' + this.app.config.host + '/pages/article/list?id=' + item.id + '&type=' + item.type,
        date: item.createdAt
      })
    })
    
    this.type = 'xml'
    this.body = feed.xml()
  }
}

module.exports = ArticleController