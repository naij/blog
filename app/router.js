'use strict'

// 通用接口
function common(app) {
  app.get('/api/article/list', app.controller.article.list)
  app.get('/api/article/detail', app.controller.article.detail)
  app.get('/api/tag/list', app.controller.tag.list)
  app.get('/api/pubinfo', app.controller.member.pubInfo)
  app.post('/api/login', app.controller.member.login)
  app.get('/api/logout', app.controller.member.logout)
  app.get('/api/feed/rss', app.controller.article.rss)
}

// 前台接口
function front(app) {
  app.get('/api/article/bytag', app.controller.article.readbytag)
  app.get('/api/article/archive', app.controller.article.archive)
  app.get('/api/article/taggroup', app.controller.article.taggroup)
}

// 后台接口
function admin(app) {
  app.get('/api/article/full', app.controller.article.full)
  app.post('/api/article/create', app.controller.article.create)
  app.post('/api/article/update', app.controller.article.update)
  app.post('/api/article/remove', app.controller.article.remove)
  app.get('/api/pic/list', app.controller.pic.list)
  app.post('/api/pic/create', app.controller.pic.create)
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
  app.get('/manage/login', app.controller.home.index)
  app.get('/manage/index', app.controller.home.index)
  app.get('/manage/article/list', app.controller.home.index)
  app.get('/manage/article/add', app.controller.home.index)
  app.get('/manage/article/edit', app.controller.home.index)
  app.get('/manage/picture/list', app.controller.home.index)
  app.get('/manage/tool/list', app.controller.home.index)
}

module.exports = function(app) {
  pages(app)
  common(app)
  front(app)
  admin(app)
}