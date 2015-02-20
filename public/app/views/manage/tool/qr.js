KISSY.add("app/views/manage/tool/qr", function (S, View, MM, VOM, Router, Node, Util) {
    var $ = Node.all;

    return View.extend({
        locationChange: function (e) {
            this.render();
        },
        render: function () {
            var me = this;

            me.setViewPagelet();
        },
        'create<click>': function (e) {
            e.halt();
            var me = this;
            var pagelet = me.getManaged('pagelet');
            var text = $('#J_qr_text').val();

            me.manage(MM.fetchAll([{
                name: "manage_tool_qr",
                postParams: {
                    text: text
                }
            }], function (errs, MesModel) {
                var data = MesModel.get('data');

                pagelet.setChunkData({qr: data.qr});
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