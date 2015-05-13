var Bookshelf = require('../dbConfig/dbConnect');

var User = Bookshelf.Model.extend({
   tableName: 'users',
   idAttribute: 'id'
});

module.exports = User;