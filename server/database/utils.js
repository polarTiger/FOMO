var pg = require('pg');
var dbUrl = require('../dbConfig/dbConfig');

module.exports = {

  //General function that queries the database given a mySQL query string
  queryDB: function(queryString, cb) {
    //console.log(queryString);
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
    'events': ['id', 'event_info', 'event_title', 'event_category', 'event_link', 'event_image'],
    'notifications': ['id', 'event_id', 'notification_date', 'notification_time', 'fired'],
    'users': ['id', 'username', 'password',  'email', 'timestamp'],
    'users_events': ['id', 'event_id', 'user_id']
  }

};
