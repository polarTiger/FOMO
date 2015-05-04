var morgan = require('morgan'); 
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var passport = require('./passport/passportConfig');


module.exports = function (app, express) {

  var userRouter = express.Router();
  var eventRouter = express.Router();

  app.use(express.static(__dirname + '/../client'));

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(session({secret: 'abcde'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/api/users', userRouter); 
  app.use('/api/events', eventRouter);

  

  require('./Users/userRoutes.js')(userRouter);
  require('./Events/eventRoutes.js')(eventRouter);


};
