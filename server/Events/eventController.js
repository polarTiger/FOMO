var pg = require('pg');
var dbUrl = require('../dbConfig/dbConfig');
var nodemailer = require('nodemailer');
var emailInfo = require('./emailAuth.js');

var getEventFromDB = function(queryString, cb) {
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
};

var sendEmail = function(emails) {
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: emailInfo
  });
  var mailOptions = {
      from: 'FOMO <tryfomo@gmail.com>',
      to: "kevinmarkvi@yahoo.com", 
      subject: 'EVENT TRIGGERED!',
      text: 'TEST TRIGGER EMAIL', // plaintext body
      html: '<b>Team Polar Tiger Rules!</b>' // html body
  };
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }else{
          console.log('Message sent: ' + info.response);
      }
  });
};

setInterval(function(){ 
  var queryString = "SELECT * FROM notifications";
  var date = new Date();
  
  getEventFromDB(queryString, function(data){
    // console.log(data);
    for (var i = 0; i < data.length; i++) {
      (function(i){
        if (data[i].notification_date !== null && data[i].notification_time !== null) {
         var dbDate= new Date(data[i].notification_date);
         var localTime= JSON.stringify(date).slice(12,17);
         date=JSON.stringify(date).slice(1,11);
         dbDate=JSON.stringify(dbDate).slice(1,11);
         var dbTime=data[i].notification_time.slice(0,5);
        
          if (date === dbDate) {
            if (localTime === dbTime  && data[i].fired === false) {
              var queryStringTrigger = "UPDATE notifications set fired= TRUE WHERE id= "+ data[i].id + ";";
              console.log('triggering!!!!!');
              getEventFromDB(queryStringTrigger, function(data2){
               module.exports.triggerEvent(data[i].event_id);
              }); 
            }
          }
        }
      })(i);
    }
  });
}, 1000*30); // update every 5 seconds

module.exports = {

  eventPlaceHolder: function(req, res) {
    res.send(200);
    console.log("Event Route Works!!!!!");
  },

  getEvent: function(req, res) {
    var id = req.url.match(/\d+/)[0];

    var queryString = "SELECT * FROM events INNER JOIN notifications ON events.id=notifications.event_id WHERE events.id = " + id + ";";

    getEventFromDB(queryString, function(rows) {

    console.log("ROWS 1:", rows);
    // if no notification for given event (needs refactor)
      if (rows.length === 0) {

        var queryString = "SELECT * FROM events WHERE events.id = " + id + ";";

        getEventFromDB(queryString, function(rows) {

          console.log("ROWS 2:", rows);

          var user_id = req.session.passport.user ? req.session.passport.user.id : 0;

          var queryString = "SELECT * from users_events WHERE event_id=" + id +
                          "and user_id=" + user_id + ";";

          getEventFromDB(queryString, function(subscribe) {

            console.log("subscribe", subscribe);
            rows[0].subscribed = (subscribe.length !== 0);

            res.end(JSON.stringify(rows[0]));
          });
        });
    // if notification for event, continue
      } else {

        var user_id = req.session.passport.user ? req.session.passport.user.id : 0;

        var queryString = "SELECT * from users_events WHERE event_id=" + id +
                          "and user_id=" + user_id + ";";

        getEventFromDB(queryString, function(subscribe) {

          console.log("subscribe", subscribe);
          rows[0].subscribed = (subscribe.length !== 0);

          res.end(JSON.stringify(rows[0]));
        });
      }

    });
  },

  addEvent: function(req, res) {
    // Require user to be logged in
    if(!req.session.passport.user) {
      res.send(403);
      return;
    }

    if (!req.body.notifyinfo && req.body.date) { // event only with date, no notification, just insert into events table
      console.log("OPTION 1");

      var queryString = "WITH first_insert AS (INSERT into events (event_info, event_title, event_category, event_link, event_date) values ('"
                        +req.body.info+"', '"+req.body.name+"', '"+req.body.category+"','"+req.body.link+"','"+req.body.date+"') RETURNING id) INSERT into users_events (event_id, user_id) SELECT id, '"
                        +req.session.passport.user.id+"' FROM first_insert;";
    } else if (!req.body.notifyinfo && !req.body.date) { // event only without event date, set date to null
      console.log("OPTION 2");
      var queryString = "WITH first_insert AS (INSERT into events (event_info, event_title, event_category, event_link) values ('"
                        +req.body.info+"', '"+req.body.name+"', '"+req.body.category+"','"+req.body.link+"') RETURNING id) INSERT into users_events (event_id, user_id) SELECT id, '"
                        +req.session.passport.user.id+"' FROM first_insert;";
    } else { // insert notifications and events, defaults to event date if notification date is unknown, defaults to 00:01 if time is unknown
      // insert into multiple tables: http://stackoverflow.com/questions/20561254/insert-data-in-3-tables-at-a-time-using-postgres
      console.log("OPTION 3");
      // console.log("notifytime: ", req.body.notifytime);
      var queryString = "WITH first_insert AS (INSERT into events (event_info, event_title, event_category, event_link, event_date) values ('"
                         +req.body.info+"', '"+req.body.name+"', '"+req.body.category+"','"+req.body.link+"','"+(req.body.date || '9999-01-01') + "') RETURNING id), second_insert AS (INSERT into notifications (event_id, notification_info, notification_date, notification_time) SELECT id, '"
                      +req.body.notifyinfo+"', '"+(req.body.notifydate || req.body.date || '9999-01-01')+"', '"+(req.body.notifytime || '00:01') +"' FROM first_insert) INSERT into users_events (event_id, user_id) SELECT id, '"
                      +req.session.passport.user.id+"' FROM first_insert;";
    }

    pg.connect(dbUrl, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      client.query(queryString, function(err, result) {
      //call `done()` to release the client back to the pool
        done();
        if(err) {
          return console.error('error running query', err);
        }
        res.send();
        client.end();
      });
    });
  },

  triggerEvent: function(eventId) {
    console.log("TriggerEvent Function Called, with event id", eventId);
    //var eventId = 1+i; //req.body.event_id
    console.log('eventId is', eventId);
    var queryString = "SELECT email FROM users INNER JOIN users_events ON users.id=users_events.user_id WHERE users_events.event_id="+ eventId + ";";
    getEventFromDB(queryString, function(emails){
      email = emails[0].email;
      sendEmail(email);
    });
   },


  searchEvents: function(req, res) {
    var clientQuery = req.query.query;
    var queryString = "SELECT * FROM events WHERE LOWER(event_title) like LOWER('%" + clientQuery + "%');";
    getEventFromDB(queryString, function(rows){
      res.end(JSON.stringify(rows));
    });
  },

  myEvents: function(req, res) {
    if(!req.session.passport.user) {
      res.send(403);
      return;
    }
    var id = req.session.passport.user.id;
    var queryString = "SELECT * FROM events INNER JOIN " +
                          "users_events ON events.id = users_events.event_id WHERE users_events.user_id="+id+";";

    getEventFromDB(queryString, function(rows){
      res.end(JSON.stringify(rows));
    });
  },

  editEvent: function(req, res) {
    console.log("REQUEST>BODY: ", req.body);
    var queryString = "UPDATE events SET event_info = '" + req.body.event_info + "', event_title = '" + req.body.event_title + "', event_category = '" + req.body.event_category + "', event_date = '" + req.body.event_date + "' WHERE id = '" + req.body.id +"';";
    getEventFromDB(queryString, function() {
      res.end();
    });
  },

  subscribe: function(req, res) {
    if(!req.session.passport.user) {
      res.send(403);
      return;
    }
    var event_id = req.url.match(/\d+/)[0];
    var user_id = req.session.passport.user.id;
    var queryString = "INSERT INTO users_events (user_id, event_id) select "+user_id+ " as user_id, "+event_id+
                        " as event_id from users_events where (user_id="+user_id+" and event_id="+event_id+ ") having count(*)=0;";
    getEventFromDB(queryString, function() {
      res.end();
    });
  },

  unsubscribe: function(req, res) {
    if(!req.session.passport.user) {
      res.send(403);
      return;
    }
    var event_id = req.url.match(/\d+/)[0];
    var user_id = req.session.passport.user.id;
    var queryString = "DELETE from users_events where user_id="+user_id+" and event_id="+event_id + ";";
    getEventFromDB(queryString, function() {
      res.end();
    });
  }
};

