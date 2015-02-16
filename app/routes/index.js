var route = require('koa-route');

module.exports = function (app) {
    app.use(route.get('/', require('../controllers/site/index')));
    app.use(route.get('/debug', require('../controllers/site/debug')));

    app.use(route.get('/api/article', require('../controllers/article/multi')));
    app.use(route.get('/api/article/:id', require('../controllers/article/read')));
    app.use(route.get('/api/archive', require('../controllers/article/archive')));
    app.use(route.get('/api/tag', require('../controllers/tag/multi')));


    // // 根据标签获取文章列表
    // app.get('/article/getArticleByTag', article.getArticleByTag);

    // // 后台路由过滤
    // app.all('/manage/*', manage.userAuth);

    // // 文章列表
    // app.get('/manage/getArticles', article.getArticles);

    // // 文章详情
    // app.get('/manage/getArticleById', article.getArticleById);

    // // 文章编辑
    // app.post('/manage/articleEdit', article.edit);

    // // 文章添加
    // app.post('/manage/articleAdd', article.add);

    // // 文章删除
    // app.post('/manage/articleDel', article.del);

    // // 标签列表
    // app.get('/manage/getTags', tag.getTags);

    // // 图片列表
    // app.get('/manage/getPictures', pic.getPictures);

    // // 图片添加
    // app.post('/manage/pictureAdd', pic.add);

    // // 账户信息
    // app.get('/loginMsg', manage.loginMsg);

    // // 登录
    // app.post('/login', manage.login);

    // // 登出
    // app.get('/logout', manage.logout);

    // // 404
    // app.use(function (req, res) {
    //     res.render("404");
    // });
}