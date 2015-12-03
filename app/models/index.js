var mongoose = require('mongoose');
var config = require('config');
var username = process.env.MONGO_USERNAME;
var password = process.env.MONGO_PASSWORD;
var exec = mongoose.Query.prototype.exec;
var mongodb;

if (username && password) {
  mongodb = 'mongodb://' + username + ':' + password + '@' + '127.0.0.1:27017/kiwiobject';
} else {
  mongodb = 'mongodb://127.0.0.1:27017/kiwiobject';
}

mongoose.connect(mongodb);
mongoose.set("debug", config.debug);
mongoose.connection.on('error', function() {
  console.error('mongodb connection error!');
});
mongoose.connection.once('open', function() {
  console.log('mongodb connect successful!');
});

// 重写Query的exec方法
mongoose.Query.prototype.exec = function(callback) {
  var me = this
  if (arguments.length > 0) {
    return exec.apply(me, arguments)
  }

  return function(cb) {
    var context = this
    var oldTime = Date.now()
    exec.call(me, function() {
      cb.apply(null, arguments)
      // var newTime = Date.now()
      // context.logger.log(log({
      //   time: newTime - oldTime + 'ms',
      //   model: me.model.modelName,
      //   method: me.op,
      //   options: me.option,
      //   conditions: me._conditions
      // }));
    });
  }
}