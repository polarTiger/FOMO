var validation = require('./validationModel');
var User = require('./userModel');
var bcrypt = require('bcrypt-nodejs');
var passport = require('../passport/passportConfig');
var uniqueEmailCode = require('../database/utils').uniqueEmailCode;
var nodemailer = require('nodemailer');
var sha1 = require('node-sha1');
if (process.env.EMAILADDRESS){
  var emailInfo = {user: process.env.EMAILADDRESS,
                   pass:  process.env.EMAILPASSWORD};
  var rootURL = process.env.ROOTURL;
} else {
  var emailInfo = require('../Events/emailAuth.js');
  var rootURL = require('../config/config');
}

var sendVerificationEmail = function(email, username, secretCode) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: emailInfo
  });

  var messageString = '<h1> Welcome to FOMO!</h1> <p>In order to send you notification emails,'
     +' we need to verify that you own this email address. <a href='+rootURL + 'api/users/verify?secretCode='
     +secretCode+'&username='+username+' >Click this link to verify your email address.</a>'
     +' Alternatively, copy this url into your address bar. ' + rootURL + 'api/users/verify?secretCode='
     +secretCode+'&username='+username+'</p>'
     + '<p> Thank you for trying FOMO!</p>'

  var mailOptions = {
    from: 'WELCOME TO FOMO <tryfomo@gmail.com>',
    to: '' + email,
    subject: 'FOMO Email Verification',
    text: 'FOMO', // plaintext body
    html: messageString
  };

  transporter.sendMail(mailOptions);

};

module.exports = {

  signedIn: function(req, res) {

    var result = req.session.passport.user ? req.session.passport.user.username : null; 
    console.log('signed in? ', result);
    res.send(result);
  }, 

  signUpPost : function(req, res, next) {
    console.log('inside Sign up post');
    var user = req.body;
    var usernamePromise = null;
    usernamePromise = new User({username: user.username}).fetch();

    return usernamePromise.then(function(model) {
      if(model) {
         res.end('already exists');
      } else {
        var password = user.password;
        var hash = bcrypt.hashSync(password);
        var emailCode = uniqueEmailCode();
        var emailHash = sha1(emailCode);

        var signUpUser = new User({username: user.username,
                                   password: hash,
                                   email: user.email,
                                   verification_hash: emailHash
                                  });

        signUpUser.save()
                  .then(function(model) {
                      sendVerificationEmail(user.email, user.username, emailCode);
                      res.end();
                    })
                  .otherwise(function(error) {
                    res.end('email exists');
                  });  
      }
   });
  },

  signInPost : 
    passport.authenticate('local', { failureRedirect: '/login'}),

  signout: function(req, res, next) {
    console.log('signout');
    req.session.destroy();
    delete req.session;
    res.end();
  },

  verify: function(req, res, next) {
    var code = req.query.secretCode;
    var username = req.query.username;
    var message = "<a href="+rootURL+">Click here to return to the main site. </a>"
    var failMessage = "Sorry, the validation failed. "
    var successMessage = "Congratulations, your email address is confirmed and you can now receive email notifications for events you are subscribed to. ";
    validation.getUserHash(username, function(rows) {
      if (rows[0] && sha1(code)===rows[0].verification_hash) {
        validation.markUserAsVerified(username, function(){
          res.send("<p>Hello, "+username+". " + successMessage+message + "</p>");
        });

        } else {
          res.send("<p>Hello, "+username+". " + failMessage + message+"</p>");
        }
      });
    }
  
};
