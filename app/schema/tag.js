var mongoose = require('mongoose')
var Schema   = mongoose.Schema

module.exports = new Schema({
  tagName: { type: String }
})