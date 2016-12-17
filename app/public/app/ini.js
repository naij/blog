KISSY.add('app/ini', function (S, Magix) {
  var Routes = {
    'app/views/default': [
      {path: '/'},
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
    defaultView: 'app/views/default',
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