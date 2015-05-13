var pg = require('pg');
var dbUrl = require('../dbConfig/dbConfig');
var nodemailer = require('nodemailer');
var emailInfo = require('./emailAuth.js');
var db = require('./eventsModel');


//This function takes params from the triggerEvent function and sends the actual email
var sendEmail = function(emails, image, link, title, eventInfo, nInfo) {
  image = image || "http://localhost:3003/images/stock.jpg"; //will need to change url when deployed
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: emailInfo
  });
  var mailOptions = {
      from: 'FOMO <tryfomo@gmail.com>',
      to: '' + emails,
      subject: 'FOMO | ' + title + ' | Notification!',
      text: 'FOMO', // plaintext body
      html: '<p><b>'+ title + '</b></p> <br> <img src='+ image + '> <br> <p>Event Info: '+ eventInfo + '</p> <br> <p>Notification Info: '+ nInfo + '</p> <br> <p>' + link + '</p>',

  };

  console.log("mailOptions: ", mailOptions);
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }else{
          console.log('Message sent: ' + info.response);
      }
  });
};

//NEEEDS COMMENT
var testTrigger = function(data, i){
  if (data[i].notification_date !== null && data[i].notification_time !== null) {
    var serverDate = new Date().toJSON();
    var serverTime = serverDate.slice(11,16);
    serverDate = serverDate.slice(0,10);
    var dbTime = data[i].notification_time.slice(0,8);
    var dbYear = data[i].notification_date.slice(0,4);
    var dbMonth = parseInt(data[i].notification_date.slice(5,7))-1;
    var dbDay = data[i].notification_date.slice(8,10);
    var dbHour = data[i].notification_time ? parseInt(data[i].notification_time.slice(0,2)) : 0;
    var dbMin = data[i].notification_time ? parseInt(data[i].notification_time.slice(3,5)) : 1;
    //var dbSec = data[i].notification_time ? parseInt(data[i].notification_time.slice(6,8)) : 0;
    var dbDate = new Date(Date.UTC(dbYear, dbMonth, dbDay, dbHour, dbMin)).toJSON();
    //console.log(dbYear, dbMonth, dbDay, dbHour, dbMin);
    //console.log(dbDate);
    dbTime = dbTime.slice(0,5);
    dbDate = dbDate.slice(0,10);
    // console.log('dbDate is ', dbDate);
    // console.log('serverDate is ', serverDate);
    // console.log('dbTime is ', dbTime);
    // console.log('serverTime is ', serverTime);
    if (serverDate === dbDate) {
      if (serverTime === dbTime  && data[i].fired === null) {
        db.setNotificationToFired(data[i].id, function(){
          var idObj = {query: {
            event_id: data[i].event_id
          }};
         module.exports.triggerEvent(idObj);
        });
      }
    }
  }
};

//Checks the current time against times in the database in order to automatically trigger events
setInterval(function(){

  db.getAllNotifications(function(data){
    notificationData = data;
    for (var i = 0; i < data.length; i++) {
      testTrigger(data, i);
    }
  });
}, 1000*10); // updates every 10 seconds

module.exports = {
  //DELETE ME WHEN NO LONGER USED IN EVENTROUTES FILE
  eventPlaceHolder: function(req, res) {
    res.send(200);
    console.log("Event Route Works!!!!!");
  },
  //Gets the event ID from the request url and calls the get event function in the eventsModel file
  getEvent: function(req, res) {
    var id = req.url.match(/\d+/)[0];
    var user_id = req.session.passport.user ? req.session.passport.user.id : 0;
    db.getEvent(id, user_id, function(rows) {
      res.end(JSON.stringify(rows[0]));
    });
  },
  
  //Calls the  addEvent function in the eventsModel file with the event information from the req.body and user id
  addEvent: function(req, res) {
    db.addEvent(req.body, req.session.passport.user.id, function(){
      res.end();
    });

  },
  //Prepares data and passes it to the send email function
  triggerEvent: function(req, res) {

    var eventId = req.query.event_id;

    db.getJustEventData(eventId, function(data) {
      db.findEmailsForEvent(eventId, function(emails){
        emailList = [];
        for (var i = 0; i < emails.length; i++) {
          emailList.push(emails[i].email);
        }
        emailList.join(',');
        sendEmail(emailList, data[0].event_image, data[0].event_link, data[0].event_title, data[0].event_info);
      });
    });
   },

  //Calls the searchEvents function in the eventsModel file with the query string included from the req
  searchEvents: function(req, res) {
    db.searchEvents(req.query, function(rows){
      res.end(JSON.stringify(rows));
    });
  },

  //Calls the searchCategories function in the eventsModel file with the selected category from the req
  searchCategories: function(req, res) {
    db.searchCategories(req.query.query, function(rows){
      res.end(JSON.stringify(rows));
    });
  },

  //Calls the myEvents function in the evensModel file with the user id from the req
  myEvents: function(req, res) {
    var id = req.session.passport.user.id;
    db.myEvents(id, function(rows){
      res.end(JSON.stringify(rows));
    });
  },

  //Calls the edit event function with the new values from the req
  editEvent: function(req, res) {
    db.editEvent(req.body, req.params.id, function(){
      res.end();
    });
  },

  //Calls the editNotification function in the eventsModel file with the new values from the req
  editNotification: function(req, res) {
    db.editNotification(req.body, req.params.id, function(){
      res.end();
    });
  },

  //Gets the event id from the url and the user id from the req and calls the subscribe function in the eventsModel file
  subscribe: function(req, res) {
    var event_id = req.url.match(/\d+/)[0];
    var user_id = req.session.passport.user.id;

    db.subscribe(user_id, event_id, function() {
      res.end();
    });
  },

  //Gets the event id from the url and the user id from the req and calls the unsubscribe function in the eventsModel file
  unsubscribe: function(req, res) {
    var event_id = req.url.match(/\d+/)[0];
    var user_id = req.session.passport.user.id;

    db.unsubscribe(user_id, event_id, function() {
      res.end();
    });
  }
};

