var db = require('../database/utils');
var queryDB = db.queryDB;
var selectColumnsFromTablesAsExcept = db.selectColumnsFromTablesAsExcept(db.tableColumns);
var escape = require('pg-escape');

module.exports = {

  //Selects and returns all stored data for an event
  getJustEventData: function(id, cb) {
    var queryStart = selectColumnsFromTablesAsExcept(['events', 'notifications'], {'notifications.id':'notificationsId'});
    var queryString = queryStart + " FROM events LEFT OUTER JOIN notifications ON "+
                      "events.id=notifications.event_id WHERE events.id = " + id + ";";
    queryDB(queryString, cb);
  },

  //NEEDS COMMENT
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

  //Queries the database and returns data based on the give searchQuery string
  searchEvents: function(searchQuery, cb) {
    var categoryString = (searchQuery.category==="undefined" || !searchQuery.category)  ? "": escape(" AND LOWER(events.event_category) like LOWER(%L)", '%'+searchQuery.category+'%');
    var queryStart = selectColumnsFromTablesAsExcept(['events', 'notifications'], {'notifications.id':'notificationsId'});
    var queryString = queryStart + escape(" FROM events LEFT OUTER JOIN notifications ON events.id=notifications.event_id WHERE LOWER(events.event_title) "+
                      "like LOWER(%L)" + categoryString + ";", '%'+searchQuery.query+'%' );
    queryDB(queryString, cb);
  },

  searchCategories: function(searchQuery, cb) {
    var queryStart = selectColumnsFromTablesAsExcept(['events', 'notifications'], {'notifications.id':'notificationsId'});
    var queryString = queryStart + " FROM events LEFT OUTER JOIN notifications ON events.id=notifications.event_id WHERE LOWER(events.event_category) "+
                      "like LOWER('%" + searchQuery + "%');";
    queryDB(queryString, cb);
  },

  //Finds all email address from users subscribed to an event from the users table given the event id
  findEmailsForEvent: function(eventId, cb) {
    var queryString = "SELECT email, verified FROM users INNER JOIN users_events ON "+
                      "users.id=users_events.user_id WHERE users.verified=TRUE AND users_events.event_id="+ eventId + ";";
    queryDB(queryString, cb);
  },

  getPopularEvents: function(cb) {
    //currently get top 10 most subscribed events and send to front end
    var queryString = "SELECT * FROM events ORDER BY no_of_subscriber DESC limit 10 ;";
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

  //Replaces event info in the database with the new information submitted
  editEvent: function(body, id, cb) {
    var editStrings = [];
    var queryStart = "UPDATE events SET ";
    var queryEnd = " WHERE id="+id+";";
    var query;

    for (var key in body){
      if (body[key]) {
        editStrings.push(key+"="+escape('%L', body[key]));
      }
    }
    query = queryStart + editStrings.join(', ') + queryEnd;
    queryDB(query, cb);
  },

  //Replaces notification info in the database with the new information submitted
  editNotification: function(body, id, cb) {
    var editStrings = [];
    var queryStart = "UPDATE notifications SET ";
    var queryEnd = " WHERE event_id="+id+";";
    var query;

    for (var key in body){
      if (body[key]) {
        editStrings.push(key+"="+escape('%L', body[key]));
      }
    }
    query = queryStart + editStrings.join(', ') + queryEnd;
    queryDB(query, cb);
  },

  //Inserts user and event information into the users_events table
  subscribe: function(user_id, event_id, cb) {
    var queryString = "INSERT INTO users_events (user_id, event_id) select "+user_id+ " as user_id, "+event_id+
                        " as event_id from users_events where (user_id="+user_id+" and event_id="+event_id+ ") having count(*)=0;";
    queryDB(queryString, cb);
  },

  //Removes user and event information from the users_events table
  unsubscribe: function(user_id, event_id, cb) {
    var queryString = "DELETE from users_events where user_id="+user_id+
                      " and event_id="+event_id + ";";
    queryDB(queryString, cb);
  },

  // change # of subscriber of the events by +1 or -1 depends on if the user subscribe or unsubscribe
  changeSubscriberCount: function(event_id, change, cb) {
    var queryString = "UPDATE  events set no_of_subscriber=no_of_subscriber+"+ change + " WHERE id=" + event_id +";";
    //console.log(queryString);
    queryDB(queryString, cb);
  },

  addEvent: function(body, user_id, cb) {
    console.log("TESTING ADD EVENT CALLED", body);
    var formattedNotifyDate = body.notifydate;
    var formattedNotifyTime = null;

    formattedNotifyDate = body.notifydate ? "'"+body.notifydate+"'" : null;
    formattedNotifyTime = body.notifytime ? "'"+body.notifytime+"'" : null;

    var queryString = escape("WITH first_insert AS (INSERT into events (event_info, event_title, event_category, event_link, event_image) values ("
                      +"%L, %L, %L, %L, %L ) RETURNING id), second_insert AS (INSERT into notifications (event_id, notification_date, notification_time) SELECT id, "
                    +formattedNotifyDate+", "+formattedNotifyTime+" FROM first_insert) INSERT into users_events (event_id, user_id) SELECT id, '"
                    +user_id+"' FROM first_insert;",  body.info, body.name, body.category, body.link, body.imgUrl);
    queryDB(queryString, cb);
  },

  //puts the event obj fetched from eventful api to database events table
  putEventFromWebToDB : function(infoObj, cb) {

    var formattedNotifyDate = infoObj.notifydate;
    var formattedNotifyTime = null;

    formattedNotifyDate = infoObj.notifydate ? "'"+infoObj.notifydate+"'" : null;
    formattedNotifyTime = infoObj.notifytime ? "'"+infoObj.notifytime+"'" : null;

    var queryString = escape("WITH first_insert AS (INSERT into events (event_info, event_title, event_category, event_link, event_image) values ("
                      +"%L, %L, %L, %L, %L) RETURNING id) INSERT into notifications (event_id, notification_date, notification_time) values"
                      +"((SELECT id from first_insert), "+formattedNotifyDate+", "+formattedNotifyTime+");",infoObj.info, infoObj.name, infoObj.category, infoObj.link, infoObj.imgUrl);
    queryDB(queryString, cb);
  },

  getAllNotifications: function(cb) {
    var queryString = "SELECT * FROM notifications";
    queryDB(queryString, cb);
  },

  setNotificationToFired: function(id, date, cb) {
    var queryStringTrigger = "UPDATE notifications set fired=TRUE, notification_date='"+date.serverDate+"', notification_time='"+date.serverTime+"' WHERE event_id= "+ id +";";
    queryDB(queryStringTrigger, cb);
  }

};

