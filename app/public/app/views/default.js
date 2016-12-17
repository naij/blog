KISSY.add('app/views/default', function (S, View, VOM, UA, Node, R, Util) {
  var $ = Node.all
  return View.extend({
    init: function () {
      var me = this
      me.observeLocation({
        pathname: true
      })
    },
    render: function () {
      var me = this
      me.setViewPagelet({
        //数据对象
      }, function () {
        me.mountMainFrame()
        me.animateLoading()
      })
    },
    mountMainFrame: function () {
      var me = this
      var loc = me.location
      var pathname = loc.pathname
      var vframe = VOM.get('magix_vf_main')
      if (vframe) {
        if (pathname == '/') {
          var viewPath = 'app/views/pages/article/list'
        } else {
          var pns = pathname.split('/')
          pns.shift()
          var folder = pns.shift() || 'home'
          var view = pns.join('/') || 'index'
          if (S.endsWith(view, '/')) {
            view += 'index'
          }
          var viewPath = 'app/views/' + folder + '/' + view
        }
        
        vframe.mountView(viewPath)
      }
    },
    locationChange: function (e) {
      this.mountMainFrame()
      this.animateLoading()
      Util.hideDialog()
      Util.hideToolTip()
    }
  })
}, {
  requires: [
    'mxext/view',
    'magix/vom',
    'ua',
    'node',
    'magix/router',
    'app/util/util'
  ]
})