'use strict'

exports.index = function*() {
  let config = {
    staticCDN: this.app.config.staticCDN
  }
  yield this.render('index.html', config)
}

exports.debug = function*() {
  let config = {
    staticCDN: this.app.config.staticCDN
  }
  yield this.render('debug.html', config)
}

exports.notfound = function*() {
  let config = {
    staticCDN: this.app.config.staticCDN
  }
  yield this.render('404.html', config)
}