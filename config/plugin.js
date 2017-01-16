'use strict'

const path = require('path')
const pluginsDir = path.join(__dirname, '../plugins')

exports.static = true

exports.rss = {
  enable: true,
  path: path.join(pluginsDir, 'rss')
}

exports.sequelize = {
  enable: true,
  path: path.join(pluginsDir, 'sequelize')
}
