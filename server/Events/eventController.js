var pg = require('pg');
var dbUrl= require('../dbConfig/dbConfig');

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
}

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

// WITH ins1 AS (
//    INSERT INTO sample(firstname, lastname)
//    VALUES ('fai55', 'shaggk')
//    RETURNING id
//    )
// , ins2 AS (
//    INSERT INTO sample1 (user_id, adddetails)  -- assuming you want to target user_id
//    SELECT id, 'ss'
//    FROM   ins1
//    RETURNING user_id
//    )
// INSERT INTO sample2 (user_id, value)          -- same here
// SELECT id, 'ss - or something else'
// FROM   ins1;

// with first_insert as (
//    insert into sample(firstname,lastname)
//    values('fai55','shaggk')
//    RETURNING id
// ),
// second_insert as (
//   insert into sample1( id ,adddetails)
//   values
//   ( (select id from first_insert), 'ss')
//   RETURNING user_id
// )
// insert into sample2 ( id ,adddetails)
// values
// ( (select user_id from first_insert), 'ss');

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
  }

};


















