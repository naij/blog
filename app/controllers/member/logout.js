var config   = require('config')
var sanitize = require('validator')
var Util   = require('../../../lib/util')
var FError   = require('../../../lib/error')
var User   = require('../../models/user')

module.exports = function *() {
  this.session = null
  this.cookies.set(config.cookieName, '', {
    path: '/'
  })

  this.body = {
    info: {
      ok: true
    }
  }
}