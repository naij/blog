var qr = require('qr-image');

module.exports = function *() {
  var body = this.request.body;
  var text = body.text;

  var svg_string = qr.imageSync(text, { 
    type: 'svg',
    size: 11
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