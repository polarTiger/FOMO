var pg = require('pg');
var dbUrl= require('../dbConfig/dbConfig');
var nodemailer = require('nodemailer');

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
      client.end();
    });
  });
};


var sendEmail = function(emails) {
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'azcardsruleforeversuckitsea@gmail.com',
          pass: 'bestemailever'
      }
  });
  var mailOptions = {
      from: 'FOMO <azcardsruleforeversuckitsea@gmail.com>', 
      to: "" + emails + ", kevinmarkvi@yahoo.com", 
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



module.exports = {

  eventPlaceHolder: function(req, res) {
    res.send(200);
    console.log("Event Route Works!!!!!");
  },

  getEvent: function(req, res) {
    var id = req.url.match(/\d+/)[0];

    var queryString = "SELECT * FROM events WHERE id = " + id + ";";

    getEventFromDB(queryString, function(rows){
        res.end(JSON.stringify(rows[0]));
    });
  },

  addEvent: function(req, res) {
    if (!req.body.notifydate) { // event only info, no notification, just insert into events table

      var queryString = "INSERT into events (event_info, event_title, event_category, event_image, event_date) values ('"
                                +req.body.info+"', '"+req.body.name+"', '"+req.body.category+"','"+req.body.link+"','"+req.body.date+"');";

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

          res.end();

          client.end();
        });
      });
    }
    else {
       // insert into multiple tables: http://stackoverflow.com/questions/20561254/insert-data-in-3-tables-at-a-time-using-postgres
       console.log('insert into events and notifcations');
      var queryString = "WITH first_insert AS (INSERT into events (event_info, event_title, event_category, event_image, event_date) values ('"
                         +req.body.info+"', '"+req.body.name+"', '"+req.body.category+"','"+req.body.link+"','"+req.body.date+"') RETURNING id) INSERT into notifications (event_id, notification_info, notification_date, notification_time) SELECT id, '"
                      +req.body.notifyinfo+"', '"+req.body.notifydate+"', '"+req.body.notifytime+"' FROM first_insert;";

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

          res.end();

          client.end();
        });
      });
    }
  },

  searchEvents: function(req, res) {
    var clientQuery = req.query.query;
    var queryString = "SELECT * FROM events WHERE LOWER(event_title) like LOWER('%" + clientQuery + "%');";

    getEventFromDB(queryString, function(rows){
      res.end(JSON.stringify(rows));
    });
  },

  myEvents: function(req, res) {
    var queryString = "SELECT * FROM events;";

    getEventFromDB(queryString, function(rows){
      res.end(JSON.stringify(rows));
    });
  },

  triggerEvent: function() {
    console.log("TriggerEvent Function Called");
    var eventId = 1; //req.body.event_id
    var queryString = "SELECT email FROM users WHERE id = (SELECT user_id FROM users_events WHERE event_id = '"+ eventId + "');";

    getEventFromDB(queryString, function(emails){
      email = emails[0].email;
      sendEmail(email);
    });
  }
};


















