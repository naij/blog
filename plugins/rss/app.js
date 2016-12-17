'use strict'

/**
 * rss client 初始化
 */


/**
 * Module dependencies.
 */
var RSS = require('rss')

module.exports = function(app) {
  app.feed = new RSS({
    title: "naij's blog",
    description: "Update on naij blog's articles.",
    language: 'zh',
    pubDate: new Date()
  })
}