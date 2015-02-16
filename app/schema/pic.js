var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = new Schema({
    picPath: { type: String },
    picSize: { type: String },
    uploadTime: { type: Date, default: Date.now }
});