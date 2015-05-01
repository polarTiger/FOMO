var morgan = require('morgan'); 
var bodyParser = require('body-parser');
var express = require('express');

module.exports = function (app, express) {

  var userRouter = express.Router();
  var eventRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use('/api/users', userRouter); 
  app.use('/api/events', eventRouter);

  app.use(express.static(__dirname + '/../client'));

  require('./Users/userRoutes.js')(userRouter);
  require('./Events/eventRoutes.js')(eventRouter);
};
