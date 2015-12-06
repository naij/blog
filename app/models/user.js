var mongoose = require('mongoose')
var thunkify = require('thunkify')
var Schema = require('../schema/user')
var Model

Model = mongoose.model('User', Schema, 'user')

module.exports = Model