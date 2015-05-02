var pg = require('pg');
var dbUrl= require('../dbConfig/dbConfig');



module.exports = {

  eventPlaceHolder: function(req, res) {
    res.send(200);
    console.log("Event Route Works!!!!!");
  },

  getEvent: function(req, res) {
    var id = req.url.match(/\d+/)[0];
    var queryStr = "SELECT * FROM events WHERE id = " + id + ";";
    var getEventFromDB = function(cb) {
      pg.connect(dbUrl, function(err, client, done) {
        if(err) {
          return console.error('error fetching client from pool', err);
        }
        client.query(queryStr, function(err, result) {
        //call `done()` to release the client back to the pool 
          done();
          if(err) {
            return console.error('error running query', err);
          } else {
            console.log(result.rows[0]); //KB: Get rid of this 'later'
            cb(result.rows[0]);
          }
          //output: 1 
          client.end();
        });
      });
    }

    getEventFromDB(function(rows){
        res.end(JSON.stringify(rows));
    }); 
  },

  addEvent: function(req, res) {

    var queryStr = "INSERT into events (event_info, event_title, event_category, event_image, event_date) values ('"
                              +req.body.info+"', '"+req.body.name+"', '"+req.body.category+"','"+req.body.link+"','"+req.body.date+"');"; 
    console.log('query ', queryStr);
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
        res.end();

        client.end();
      });
    });
  }

};
