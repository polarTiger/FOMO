/* 
Please create a file called "dbConfig.js" under db folder,
copy-past the content below to that file, and add your  username and password  to 
the placeholderfor mysql



*/
var Bookshelf = require('bookshelf');
var Knex=require('knex');
var DB = Knex.initialize({
  client: 'mysql',
  connection: {
      host     : '127.0.0.1',
      user     : 'YOUR_USERNAME', // default can be 'root'
      password : 'YOUR_PASSWORD', // default is your mysql root password.
      database : 'myapp_test',
      charset  : 'utf8'
  }
});
module.exports=DB;
