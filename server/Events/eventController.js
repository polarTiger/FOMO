var pg = require('pg');

var dbUrl = process.env.DATABASE_URL || 'postgres://username:@localhost/polartiger';


module.exports = {

  eventPlaceHolder: function(req, res) {
    res.send(200);
    console.log("Event Route Works!!!!!");
  },

  getEvent: function(req, res) {
    var id = req.url.match(/\d+/)[0];
    var queryStr = "SELECT * FROM events WHERE id = " + id + ";";
    pg.connect(dbUrl, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      client.query(queryStr, function(err, result) {
      //call `done()` to release the client back to the pool 
        done();
        if(err) {
          return console.error('error running query', err);
        }
        console.log(result); //KB: Get rid of this 'later'
        //output: 1 
        client.end();
      });
    });
  },

  addEvent: function(req, res) {
    //KB: Currently inserts dummy data
    var queryStr = "INSERT into events (id, event_info, event_title, event_category) values (2, 'Concert', 'Awesome Concert', 'Music');"; 
    pg.connect(dbUrl, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      client.query(queryStr, function(err, result) {
      //call `done()` to release the client back to the pool 
        done();
        if(err) {
          return console.error('error running query', err);
        }
        console.log(result); //KB: Get rid of this 'later'
        //output: 1 
        client.end();
      });
    });

  }
<<<<<<< HEAD
=======

>>>>>>> [feature]Server Database interaction
};




<<<<<<< HEAD
=======

>>>>>>> [feature]Server Database interaction
