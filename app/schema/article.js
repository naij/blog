var mongoose = require('mongoose')
var Schema   = mongoose.Schema

module.exports = new Schema({
  type: { type: String },
  tag: { type: String },
  title: { type: String },
  content: { type: String },
  markdown: { type: String },
  update: { type: Date, default: Date.now },
  draft: { type: Boolean, default: false },
  pv: { type: Number, default: 0 }
})