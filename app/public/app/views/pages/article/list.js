KISSY.add('app/views/pages/article/list', function (S, View, MM, VOM, Router, Node, Util) {
  var $ = Node.all

  return View.extend({
    locationChange: function (e) {
      this.animateLoading()
      this.render()
    },
    render: function () {
      var me = this
      var loc = me.location
      var params = loc.params
      var type = params.type || 'f2e'

      me.manage(MM.fetchAll([{
        name: 'article_list',
        urlParams: {
          type: type
        }
      }], function (errs, MesModel) {
        var data = MesModel.get('data')

        for (var i = 0; i < data.length; i++) {
          data[i].content = data[i].content.replace(/<[^>]+>/g, '')
          data[i].content = data[i].content.substring(0, 300) + ' ... ...'
        }

        me.setViewPagelet({
          list: data
        })
      }))
    }
  })
},{
  requires:[
    'mxext/view',
    'app/models/modelmanager',
    'magix/vom',
    'magix/router',
    'node',
    'app/util/util'
  ]
})