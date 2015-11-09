var through2 = require('through2');

module.exports = function (callback, context) {
  return through2.obj(function (file, enc, next) {
    callback.call(context || this, file);
    next(null, file);
  });
};