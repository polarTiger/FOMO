var db = require('../database/utils');
var queryDB = db.queryDB;
var selectColumnsFromTablesAsExcept = db.selectColumnsFromTablesAsExcept(db.tableColumns);
var escape = require('pg-escape');

module.exports = {
  setUserHashedSecret: function(username, hashedSecret) {
    var queryString = escape("UPDATE users SET verification_hash="+hashedSecret+" WHERE username=%L;", username);
    queryDB(queryString, cb);
  },
  getUserHash: function(username, cb) {
    var queryString = escape("SELECT verification_hash from users where username=%L;", username);
    queryDB(queryString, cb);
  },

  markUserAsVerified: function(username, cb) {
    var queryString = escape("UPDATE users SET verified=TRUE WHERE username=%L;", username);
    queryDB(queryString, cb);
  } 
};
