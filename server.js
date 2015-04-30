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

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
});




var DB = Knex.initialize({
    client: 'mysql',
    connection: {
        host     : '127.0.0.1',
        user     : 'root',
        password : 'password',
        database : 'myapp_test',
        charset  : 'utf8'
  }
});



// this is our schema example:
var userTable = function (userTable) {
  userTable.increments('id').primary();
  userTable.integer('userID');
  userTable.string('userName');
  userTable.string('password');
  userTable.timestamps();
};

var eventTable = function (eventTable) {
  eventTable.increments('id').primary();
  eventTable.integer('eventID');
  eventTable.text('eventInfo');
  eventTable.timestamps();
};

var userEventJointTable=function(userEventJointTable) {
  userEventJointTable.increments('id').primary();
  userEventJointTable.integer('userID');
  userEventJointTable.integer('eventID');
  userEventJointTable.timestamps();
};

var commentTable=function(commentTable) {
  commentTable.increments('id').primary();
  commentTable.integer('userID');
  commentTable.integer('eventID');
  commentTable.text('commentText');
  commentTable.timestamps();
};

var tagTable=function(tagTable) {
  tagTable.increments('id').primary();
  tagTable.integer('userID');
  tagTable.integer('eventID');
  tagTable.string('tagName');
  tagTable.timestamps();
};

}

var userEventJointTable=function(userEventJointTable) {
  userEventJointTable.increment('id').primary();
  userEventJointTable.integer('userID');
  userEventJointTable.integer('eventID');
}

var 


// this executes the schema operation:
DB.schema.hasTable('users').then(function(exists) {
  if (! exists) {
    DB.schema.createTable('users', userTable).then(function () {
      console.log('Users Table is Created!');
    });
  }
});

DB.schema.hasTable('events').then(function(exists) {
  if (! exists) {
    DB.schema.createTable('events', eventTable).then(function () {
      console.log('events Table is Created!');
    });
  }
});

DB.schema.hasTable('usereventjoint').then(function(exists) {
  if (! exists) {
    DB.schema.createTable('usereventjoint', userEventJointTable).then(function () {
      console.log('usereventjoint Table is Created!');
    });
  }
});


DB.schema.hasTable('comments').then(function(exists) {
  if (! exists) {
    DB.schema.createTable('comments', commentTable).then(function () {
      console.log('comments Table is Created!');
    });
  }
});

DB.schema.hasTable('tags').then(function(exists) {
  if (! exists) {
    DB.schema.createTable('tags', tagTable).then(function () {
      console.log('tags Table is Created!');
    });
  }
});




/* example insertion
=======

/*
>>>>>>> 7130750269a0360a5f2e18e9feca310f1a5367f0
DB('movies')
   .insert({title: "The Artist", year: 2010})
   .then(function() { console.log("added"); })
   .catch(function(err) { console.log(err) });
*/

