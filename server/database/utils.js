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
  },

  /**
   * create a function which does the following: 
   *
   * creates the beginning of a select query using all columns from tables in 
   * the array tables. 
   *
   * as is an object in the form {"notifications.id: notificationsId"} where
   * notifications.id AS notificationsId will be used. 
   *
   * except is an object in the form {"notifications.id: notificationsId"} where 
   * all included keys will not be added to the select query
   * 
   * "SELECT events.id, events.info, notification.id AS notificationsID" is a sample output
   *
   * In the outer function, tableColumns provides an object with the names of your tables 
   * as keys and the column names as values. Pass this 
   */
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
    }
  },

  tableColumns: {
                'events': ['id', 'event_info', 'event_title', 'event_category', 'event_link', 'event_image'],
                'notifications': ['id', 'event_id', 'notification_info', 'notification_date', 'notification_time', 'fired'],
                'users': ['id', 'username', 'password',  'email', 'timestamp'],
                'users_events': ['id', 'event_id', 'user_id']
              }

};
