KISSY.add('app/views/header', function (S, View, Node, MM) {
  var $ = Node.all

  return View.extend({
    locationChange: function (e) {
      this.render()
    },
    render: function () {
      var me = this
      var loc = me.location
      var path = loc.pathname
      var params = loc.params
      var pathMap = {
        '/pages/article/list': {
          param: 'type'
        },
        '/pages/article/detail': {
          path: '/pages/article/list',
          param: 'type'
        }
      }

      me.setViewPagelet({
      
      }, function () {
        navSelected()
      }, function () {
        navSelected()
      })

      function navSelected () {
        var siteNav = $('.site-nav li')

        if (!path) {
          return siteNav[0].addClass('selected')
        }

        var rule = pathMap[path]

        siteNav.each(function (node) {
          var nodeHref = node.one('a').attr('href')
          var nodeSelectValue = node.one('a').attr('selectValue')
          siteNav.removeClass('selected')

          if (nodeHref == path) {
            node.addClass('selected')
            return false
          }

          if (nodeHref.indexOf(path) != -1) {
            if (rule && rule.param && params[rule.param] == nodeSelectValue) {
              node.addClass('selected')
              return false
            }
          }

          if (rule && rule.path && nodeHref.indexOf(rule.path) != -1) {
            if (rule && rule.param && params[rule.param] == nodeSelectValue) {
              node.addClass('selected')
              return false
            }
          }
        })
      }
    }
  })
}, {
  requires: [
  'mxext/view',
  'node', 
  'app/models/modelmanager'
  ]
})