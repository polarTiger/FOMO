var express=require('express');
var app=express();
var Bookshelf = require('bookshelf');
var Knex=require('knex');

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


/*
DB('movies')
   .insert({title: "The Artist", year: 2010})
   .then(function() { console.log("added"); })
   .catch(function(err) { console.log(err) });
*/
