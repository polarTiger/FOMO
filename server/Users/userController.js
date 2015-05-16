var validation = require('./validationModel');
var User = require('./userModel');
var bcrypt = require('bcrypt-nodejs');
var passport = require('../passport/passportConfig');
var uniqueEmailCode = require('../database/utils').uniqueEmailCode
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
  console.log('hi');
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: emailInfo
  });

  var mailOptions = {
    from: 'FOMO <tryfomo@gmail.com>',
    to: '' + email,
    subject: 'Verify your email address',
    text: 'FOMO', // plaintext body
    html: '<a href='+rootURL + 'api/users/verify?secretCode='+secretCode+'&username='+username+' >click here</a>'
  };

  transporter.sendMail(mailOptions);

}

module.exports = {

  signedIn: function(req, res) {
    console.log("signed in, ", req.session.passport.user);
    var result = req.session.passport.user ? req.session.passport.user.username : null; 
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
         //****************************************************//
         // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
         //****************************************************//
         var password = user.password;
         var hash = bcrypt.hashSync(password);
         var emailCode = uniqueEmailCode();
         var emailHash = sha1(emailCode);

         var signUpUser = new User({username: user.username,
          password: hash,
          email: user.email,
          verification_hash: emailHash
         });

         signUpUser.save().then(function(model) {
            sendVerificationEmail(user.email, user.username, emailCode);
            res.end();
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
    validation.getUserHash(username, function(rows) {
      if (sha1(code)===rows[0].verification_hash) {
        validation.markUserAsVerified(username, function(){
          res.send(username + ", your email is good");
        })

        } else {
          res.send(username + ", sorry bad validation");
        }
      });
    }

  
};