'use strict'

let _ = require('lodash')

exports.list = function*() {
  let type = this.query.type
  let articles = yield this.service.article.list({type: type})
  return this.renderJSON({
    code: 200,
    data: articles
  })
}

exports.full = function*() {
  let type = this.query.type
  let articles = yield this.service.article.full(type)
  return this.renderJSON({
    code: 200,
    data: articles
  })
}

exports.detail = function*() {
  let id = this.query.id
  let article = yield this.service.article.detail(id)
  return this.renderJSON({
    code: 200,
    data: article
  })
}

exports.readbytag = function*() {
  let tag = this.query.tag
  let articles = yield this.service.article.readbytag(tag)
  return this.renderJSON({
    code: 200,
    data: articles
  })
}

exports.taggroup = function*() {
  let tags = yield this.service.article.taggroup()
  return this.renderJSON({
    code: 200,
    data: tags
  })
}

exports.archive = function*() {
  let articles = yield this.service.article.archive()
  return this.renderJSON({
    code: 200,
    data: articles
  })
}

exports.create = function*() {
  let postData = this.request.body
  let article = yield this.service.article.create(postData)

  return this.renderJSON({
    code: 200,
    data: {
      id: article.id
    }
  })
}

exports.update = function*() {
  let postData = this.request.body
  let article = yield this.service.article.update(postData)

  return this.renderJSON({
    code: 200,
    data: {
      id: article.id
    }
  })
}

exports.remove = function*() {
  let postData = this.request.body
  let article = yield this.service.article.remove(postData)

  return this.renderJSON({
    code: 200,
    data: {
      id: article.id
    }
  })
}

exports.rss = function*() {
  let feed = this.feed
  let articles = yield this.service.article.list({
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