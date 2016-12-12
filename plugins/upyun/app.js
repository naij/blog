'use strict'

/**
 * upyun client 初始化
 */


/**
 * Module dependencies.
 */
var UpYun = require('upyun')

module.exports = function(app) {
  let config = app.config.upyun
  let backname = config.backname
  let username = config.username
  let password = config.password
  app.upyunClient = new UpYun(backname, username, password, '', {
    apiVersion: 'v2'
  })
}