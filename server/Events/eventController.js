var pg = require('pg');
var dbUrl = process.env.DATABASE_URL || 'postgres://username:@localhost/polartiger';



module.exports = {

  eventPlaceHolder: function(req, res) {
    res.send(200);
    console.log("Event Route Works!!!!!");
  }
};




