var mongoose = require('mongoose')
var thunkify = require('thunkify')
var Schema   = require('../schema/article')
var Model

Model = mongoose.model('Article', Schema, 'article')

module.exports = Model