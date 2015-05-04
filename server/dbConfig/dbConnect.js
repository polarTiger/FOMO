
var dbUrl = require('./dbConfig');

var knex = require('knex')({
  client: 'pg', 
  connection: dbUrl
});

var Bookshelf = require('bookshelf')(knex);

/*
var DB = Bookshelf.initialize({
   client: 'pg', 
   connection: dbUrl
});
*/

module.exports = Bookshelf;