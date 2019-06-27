'use strict'

// 数据接口
function front(app) {
  const { router, controller } = app
  router.get('/api/article/list.json', controller.article.list)
  router.get('/api/article/detail.json', controller.article.detail)
  router.get('/api/feed/rss.json', controller.article.rss)
  router.get('/api/article/bytag.json', controller.article.readbytag)
  router.get('/api/article/archive.json', controller.article.archive)
  router.get('/api/article/taggroup.json', controller.article.taggroup)
}

// 页面路径
function pages(app) {
  const { router, controller } = app
  router.get('/', controller.home.index)
  // router.get('/debug', controller.home.debug)
  router.get('/404', controller.home.notfound)
  router.get('/pages/article/list', controller.home.index)
  router.get('/pages/article/detail', controller.home.index)
  router.get('/pages/about/index', controller.home.index)
  router.get('/pages/tags/list', controller.home.index)
  router.get('/pages/archive/list', controller.home.index)
}

module.exports = function(app) {
  pages(app)
  front(app)
}