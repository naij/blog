KISSY.add('app/views/manage/login', function (S, Magix, View, MM) {
  return View.extend({
    render: function () {
      var me = this

      me.setViewPagelet()
    },
    'submit<click>': function (e) {
      e.halt()
      var me = this
      var pagelet = me.getManaged('pagelet')
      var formData = S.unparam( S.IO.serialize('#loginForm'))

      me.manage(MM.fetchAll([{
        name: "login",
        postParams: formData
      }], function (errs, MesModel) {
        Magix.local('isLogined', true)
        me.navigate('/manage/index')
      }))
    }
  })
},{
  requires:[
    'magix/magix',
    'mxext/view',
    'app/models/modelmanager'
  ]
})