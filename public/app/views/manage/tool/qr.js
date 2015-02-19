KISSY.add("app/views/manage/tool/qr", function (S, View, MM, VOM, Router, Node, Util) {
    var $ = Node.all;

    return View.extend({
        locationChange: function (e) {
            this.render();
        },
        render: function () {
            var me = this;

            me.manage(MM.fetchAll([{
                name: "manage_tool_qr"
            }], function (errs, MesModel) {
                var data = MesModel.get('data');

                me.setViewPagelet({
                    qr: data.qr
                }, function () {
                    // me.components();
                });
            }));
        }
    });
},{
    requires:[
        'mxext/view',
        'app/models/modelmanager',
        'magix/vom',
        'magix/router',
        'node',
        'app/util/util'
    ]
});