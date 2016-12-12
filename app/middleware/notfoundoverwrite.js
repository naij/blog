'use strict'

module.exports = options => {
  return function* notfoundoverwrite(next) {
    yield next

    let config = {
      staticCDN: this.app.config.staticCDN
    }

    if (this.status == 404) {
      if (this.acceptJSON) {
        return
      } else {
        yield this.render('404.html', config)
      }
    }
  }
}