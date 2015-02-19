var qr = require('qr-image');

module.exports = function *() {
    var svg_string = qr.imageSync('http://www.taobao.com', { 
        type: 'svg',
        size: 5
    });

    this.body = {
        data: {
            qr: svg_string
        },
        info: {
            ok: true
        }
    } 
}