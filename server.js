var express=require('express');
var Bookshelf = require('bookshelf');
var Knex=require('knex');

var app = module.exports = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Bookshelf = require('bookshelf');
var Knex=require('knex');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'));


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var server = app.listen(3003, function () {
  var host = server.address().address;
  var port = server.address().port;
});





