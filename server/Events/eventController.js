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
  }


};


















