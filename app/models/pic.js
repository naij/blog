var mongoose = require('mongoose');
var thunkify = require('thunkify');
var Schema = require('../schema/pic');
var Model;

Model = mongoose.model('Pic', Schema);



module.exports = Model;