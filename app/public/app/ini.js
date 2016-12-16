KISSY.add('app/ini', function (S) {
  var T = {
    routes: {
      'app/views/default': [
        '/pages/article/list',
        '/pages/article/detail',
        '/pages/about/index',
        '/pages/tags/list',
        '/pages/archive/list',
        '/manage/login',
        '/manage/index',
        '/manage/article/list',
        '/manage/article/add',
        '/manage/article/edit',
        '/manage/picture/list',
        '/manage/tool/list',
        '/manage/tool/qr'
      ]
    }
  }
  return {
    //默认加载的view
    defaultView: 'app/views/default',
    //默认的pathname
    defaultPathname: '/pages/article/list',
    //404时显示的view，如果未启用，则404时显示defaultView
    notFoundView: 'app/views/404',
    routes: function (pathname) {
      if (!S.isEmptyObject(T.routes)) {
        var s
        S.each(T.routes, function (item, k) {
          if (S.inArray(pathname, item)) {
            s = k
          }
        })
        if (s) return s
        return this.notFoundView
      }
      return this.defaultView
    }
  }
}, {
  requires: ["node"]
})