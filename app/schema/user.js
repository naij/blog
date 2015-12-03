var mongoose = require('mongoose')
var Schema   = mongoose.Schema
  
module.exports = new Schema({
  loginname: { type: String, unique: true },
  password: { type: String }
})