var pg = require('pg');
var dbUrl = require('../dbConfig/dbConfig');
module.exports = {
  queryDB: function(queryString, cb) {
    console.log(queryString);
    pg.connect(dbUrl, function(err, client, done) {

        if(err) {
          return console.error('error fetching client from pool', err);
        }
        client.query(queryString, function(err, result) {
        //call `done()` to release the client back to the pool
          done();
          if(err) {
            return console.error('error running query', err);
          } else {
            cb(result.rows);
          }
          //output: 1
        });
      });
      pg.end();
    },

  sanitizeString: function(str) {
    return str.replace(/'/g,"''");
  }


};
