var mongoose = require('mongoose')
var thunkify = require('thunkify')
var Schema = require('../schema/tag')
var Model

Model = mongoose.model('Tag', Schema, 'tag')



module.exports = Model