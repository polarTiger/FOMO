var pg = require('pg');
var dbUrl = process.env.DATABASE_URL || require('../dbConfig/dbConfig');

module.exports = {

  //General function that queries the database given a mySQL query string
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

  //NEEDS COMMENT 
  sanitizeString: function(str) {
    return str.replace(/'/g,"''");
  },

  //NEEDS COMMENT
  selectColumnsFromTablesAsExcept: function(tableColumns) {
    return function(tables, as, except){
      as = as || {};
      except = except || {};
      var queryStart = 'SELECT ';
      var columns = [];
      for (var i = 0; i<tables.length; i++) {

        for (var j = 0; j<tableColumns[tables[i]].length; j++) {
          var column = tables[i] + '.' + tableColumns[tables[i]][j];
          if (!(column in except)) {
            if (column in as) {
              column += ' AS ' + as[column];
            }
            columns.push(column);
          }
        }
      }
      return queryStart += columns.join(', ');
    };
  },

  tableColumns: {
    'events': ['id', 'event_info', 'event_title', 'event_category', 'event_link', 'event_image', 'no_of_subscriber'],
    'notifications': ['id', 'event_id', 'notification_date', 'notification_time', 'fired'],
    'users': ['id', 'username', 'password',  'email', 'verification_hash', 'verified', 'timestamp'],
    'users_events': ['id', 'event_id', 'user_id']
  },

  /*
   * Generates a unique id
   * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   */ 
  uniqueEmailCode: function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

};
