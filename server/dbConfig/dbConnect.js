
var dbUrl = require('./dbConfig');

var knex = require('knex')({
  client: 'pg', 
  connection: dbUrl
});

var Bookshelf = require('bookshelf')(knex);

module.exports = Bookshelf;
