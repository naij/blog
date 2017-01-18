'use strict'

exports.index = function*() {
  let config = {
    cdn: this.app.config.cdn
  }
  yield this.render('index.html', config)
}

exports.notfound = function*() {
  let config = {
    cdn: this.app.config.cdn
  }
  yield this.render('404.html', config)
}