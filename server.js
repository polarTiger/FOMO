var express = require('express');
var app = module.exports = express();
var path = require('path');
require('./server/routes');



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
});
