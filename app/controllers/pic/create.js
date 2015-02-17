var config   = require('config');
var upyun    = require('upyun');
var util     = require('../../../lib/util');
var FError   = require('../../../lib/error');
var Article  = require('../../models/article');
var backname = config.upyunBuckname;
var username = process.env.UPYUN_USERNAME;
var password = process.env.UPYUN_PASSWORD;

// 创建又拍云客户端
// var upyunClient = new upyun(backname, username, password);

module.exports = function *() {
    

    this.body = {
        data: '',
        info: {
            ok: true
        }
    } 
}