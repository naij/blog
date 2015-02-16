var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  
module.exports = new Schema({
    name: { type: String, index: true },
    loginname: { type: String, unique: true },
    pass: { type: String }
});