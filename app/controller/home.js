'use strict'

const { Controller } = require('egg')

class HomeController extends Controller {
  async index() {
    let config = {
      cdn: this.app.config.cdn
    }
    await this.render('index.html', config)
  }

  async notfound() {
    let config = {
      cdn: this.app.config.cdn
    }
    await this.render('404.html', config)
  }
}