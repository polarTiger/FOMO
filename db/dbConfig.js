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
module.exports=DB;