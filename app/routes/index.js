var route = require('koa-route');

module.exports = function (app) {
    // 首页
    app.use(route.get('/', require('../controllers/site/index')));
    app.use(route.get('/debug', require('../controllers/site/debug')));

    // 前台接口
    app.use(route.get('/api/article', require('../controllers/article/multi')));
    app.use(route.get('/api/article/:tag', require('../controllers/article/readbytag')));
    app.use(route.get('/api/article/:id', require('../controllers/article/read')));
    app.use(route.get('/api/archive', require('../controllers/article/archive')));
    app.use(route.get('/api/tag', require('../controllers/article/tag')));
    app.use(route.post('/api/login', require('../controllers/member/login')));
    app.use(route.get('/api/logout', require('../controllers/member/logout')));

    // 后台接口
    app.use(route.get('/manage/article', require('../controllers/article/multi')));
    app.use(route.get('/manage/article/:id', require('../controllers/article/read')));
    app.use(route.post('/manage/article', require('../controllers/article/create')));
    app.use(route.put('/manage/article/:id', require('../controllers/article/update')));
    app.use(route.del('/manage/article/:id', require('../controllers/article/remove')));
    app.use(route.get('/manage/tag', require('../controllers/tag/multi')));
    app.use(route.get('/manage/pic', require('../controllers/pic/multi')));
    app.use(route.post('/manage/pic', require('../controllers/pic/create')));
    app.use(route.get('/manage/tool/qr', require('../controllers/tool/qr')));
}