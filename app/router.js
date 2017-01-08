'use strict'

// 数据接口
function front(app) {
  app.get('/api/article/list.json', app.controller.article.list)
  app.get('/api/article/detail.json', app.controller.article.detail)
  app.get('/api/feed/rss.json', app.controller.article.rss)
  app.get('/api/article/bytag.json', app.controller.article.readbytag)
  app.get('/api/article/archive.json', app.controller.article.archive)
  app.get('/api/article/taggroup.json', app.controller.article.taggroup)
}

// 页面路径
function pages(app) {
  app.get('/', app.controller.home.index)
  app.get('/debug', app.controller.home.debug)
  app.get('/404', app.controller.home.notfound)
  app.get('/pages/article/list', app.controller.home.index)
  app.get('/pages/article/detail', app.controller.home.index)
  app.get('/pages/about/index', app.controller.home.index)
  app.get('/pages/tags/list', app.controller.home.index)
  app.get('/pages/archive/list', app.controller.home.index)
}

module.exports = function(app) {
  pages(app)
  front(app)
}