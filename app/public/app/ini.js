KISSY.add('app/ini', function (S, Magix) {
  var Routes = {
    'app/views/default': [
      {path: '/pages/article/list'},
      {path: '/pages/article/detail'},
      {path: '/pages/about/index'},
      {path: '/pages/tags/list'},
      {path: '/pages/archive/list'},
      {path: '/manage/login'},
      {path: '/manage/index', isLogin: true},
      {path: '/manage/article/list', isLogin: true},
      {path: '/manage/article/add', isLogin: true},
      {path: '/manage/article/edit', isLogin: true},
      {path: '/manage/picture/list', isLogin: true},
      {path: '/manage/tool/list', isLogin: true}
    ]
  }
  return {
    //默认加载的view
    defaultView: 'app/views/default',
    //默认的pathname
    defaultPathname: '/pages/article/list',
    //404时显示的view，如果未启用，则404时显示defaultView
    notFoundView: 'app/views/404',
    routes: function (pathname) {
      if (!S.isEmptyObject(Routes)) {
        var s
        S.each(Routes, function(v, k) {
          S.each(v, function(item) {
            if (item.path == pathname) {
              if (item.isLogin) {
                Magix.checkToLogin()
              }
              s = k
              return false
            }
          })
          if (s) return false
        })
        if (s) return s
        return this.notFoundView
      }
      return this.defaultView
    }
  }
}, {
  requires: [
    'magix/magix'
  ]
})