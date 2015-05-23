var Bookshelf = require('../dbConfig/dbConnect');

// user model
var User = Bookshelf.Model.extend({
   tableName: 'users',
   idAttribute: 'id'
});

module.exports = User;
