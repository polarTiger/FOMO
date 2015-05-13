var db = require('../database/utils');
var queryDB = db.queryDB;
var selectColumnsFromTablesAsExcept = db.selectColumnsFromTablesAsExcept(db.tableColumns);
var escape = require('pg-escape');

module.exports = {
  getJustEventData: function(id, cb) {

    var queryString = "SELECT * FROM events WHERE id = " + id +";";
    queryDB(queryString, cb);
  },
  getEvent: function(id, user_id, cb) {
    var queryStart = selectColumnsFromTablesAsExcept(['events', 'notifications'], {'notifications.id':'notificationsId'});
    var queryString = queryStart + " FROM events LEFT OUTER JOIN notifications ON "+
                      "events.id=notifications.event_id WHERE events.id = " + id + ";";

    queryDB(queryString, function(rows) {

      var subscriptionQueryString = "SELECT * from users_events WHERE event_id=" + id +
                                  " and user_id=" + user_id + ";";
      queryDB(subscriptionQueryString, function(subscribe){
        rows[0].subscribed = (subscribe.length !== 0);
        cb(rows);
      });
    });

  },
  searchEvents: function(searchQuery, cb) {
    var categoryString = (searchQuery.category==="undefined" || !searchQuery.category)  ? "": " AND LOWER(events.event_category) like LOWER('%" + searchQuery.category + "%')";
    var queryStart = selectColumnsFromTablesAsExcept(['events', 'notifications'], {'notifications.id':'notificationsId'});
    var queryString = queryStart + " FROM events LEFT OUTER JOIN notifications ON events.id=notifications.event_id WHERE LOWER(events.event_title) "+
                      "like LOWER('%" + searchQuery.query + "%')" + categoryString + ";";
    queryDB(queryString, cb);
  },

  searchCategories: function(searchQuery, cb) {
    var queryStart = selectColumnsFromTablesAsExcept(['events', 'notifications'], {'notifications.id':'notificationsId'});
    var queryString = queryStart + " FROM events LEFT OUTER JOIN notifications ON events.id=notifications.event_id WHERE LOWER(events.event_category) "+
                      "like LOWER('%" + searchQuery + "%');";
    queryDB(queryString, cb);
  },

  findEmailsForEvent: function(eventId, cb) {
    var queryString = "SELECT email FROM users INNER JOIN users_events ON "+
                      "users.id=users_events.user_id WHERE users_events.event_id="+ eventId + ";";
    queryDB(queryString, cb);
  },

  myEvents: function(id, cb) {
    var queryStart = selectColumnsFromTablesAsExcept(['events', 'users_events', 'notifications'],
                                                        {
                                                          'notifications.id': 'notificationsID',
                                                          'users_events.id':'users_eventsID'
                                                        });
    var queryString = queryStart + " FROM events INNER JOIN " +
                          "users_events ON events.id = users_events.event_id " +
                          "LEFT OUTER JOIN notifications ON events.id=notifications.event_id" +
                          " WHERE users_events.user_id="+id+";";
    queryDB(queryString, cb);
  },

  editEvent: function(body, id, cb) {
    var editStrings = [];
    var queryStart = "UPDATE events SET "
    var queryEnd = " WHERE id="+id+";"
    var query;

    for (var key in body){
      if (body[key]) {
        editStrings.push(key+"='"+body[key]+"'")
      }
    }

    query = queryStart + editStrings.join(', ') + queryEnd;
    queryDB(query, cb);
  },

  editNotification: function(body, id, cb) {
    var editStrings = [];
    var queryStart = "UPDATE notifications SET "
    var queryEnd = " WHERE event_id="+id+";"
    var query;

    for (var key in body){
      if (body[key]) {
        editStrings.push(key+"='"+body[key]+"'")
      }
    }

    query = queryStart + editStrings.join(', ') + queryEnd;
    queryDB(query, cb);
  },

  subscribe: function(user_id, event_id, cb) {
    var queryString = "INSERT INTO users_events (user_id, event_id) select "+user_id+ " as user_id, "+event_id+
                        " as event_id from users_events where (user_id="+user_id+" and event_id="+event_id+ ") having count(*)=0;";
    queryDB(queryString, cb);
  },

  unsubscribe: function(user_id, event_id, cb) {
    var queryString = "DELETE from users_events where user_id="+user_id+
                      " and event_id="+event_id + ";";
    queryDB(queryString, cb);
  },

  addEvent: function(body, user_id, cb) {

    var formattedNotifyDate = body.notifydate;
    var formattedNotifyTime = null;

    formattedNotifyDate = body.notifydate ? "'"+body.notifydate+"'" : null;

    formattedNotifyTime = body.notifytime ? "'"+body.notifytime+"'" : null;



    var queryString = escape("WITH first_insert AS (INSERT into events (event_info, event_title, event_category, event_link, event_image) values ("
                      +"%L, %L, %L, %L, %L ) RETURNING id), second_insert AS (INSERT into notifications (event_id, notification_info, notification_date, notification_time) SELECT id, %L"
                    + ", "+formattedNotifyDate+", "+formattedNotifyTime+" FROM first_insert) INSERT into users_events (event_id, user_id) SELECT id, '"
                    +user_id+"' FROM first_insert;",  body.info, body.name, body.category, body.link, body.imgUrl, body.notifyinfo);
    //console.log('QUERY STRING: ', queryString);

    queryDB(queryString, cb);
  },

  getAllNotifications: function(cb) {
    var queryString = "SELECT * FROM notifications";
    queryDB(queryString, cb);
  },

  setNotificationToFired: function(id, cb) {

    var queryStringTrigger = "UPDATE notifications set fired= TRUE WHERE id= "+ id + ";";
    queryDB(queryStringTrigger, cb);

  }


}

