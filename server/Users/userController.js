var User = require('./userModel');
var bcrypt = require('bcrypt-nodejs');
var passport = require('../passport/passportConfig');



module.exports = {

  userPlaceHolder: function(req, res) {
    res.send(200);
    console.log("User Route Works!!!!!");
  }, 

  signUpPost : function(req, res, next) {
   console.log('inside Sign up post');
   var user = req.body;
   var usernamePromise = null;
   usernamePromise = new User({username: user.username}).fetch();

   return usernamePromise.then(function(model) {
      if(model) {
         res.end('user already exist');
      } else {
         //****************************************************//
         // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
         //****************************************************//
         var password = user.password;
         var hash = bcrypt.hashSync(password);

         var signUpUser = new User({username: user.username, password: hash});

         signUpUser.save().then(function(model) {
            // sign in the newly registered user
            console.log('here verified sign up');
            next();
            //signInPost(req, res, next);
         });  
      }
   });
  },

  signInPost : function(req, res, next) {
    console.log('inside signin post');
     passport.authenticate('local', { successRedirect: '/',
                            failureRedirect: 'api/users/signup'}, function(err, user, info) {
        if(err) {
           return res.end('encountered error during sign in');
        } 

        if(!user) {
           return res.end('user does not exist');
        }
        return req.logIn(user, function(err) {
           if(err) {
              return res.end('encountered error during sign in');
           } else {
              return res.redirect('/');
           }
        });
     })(req, res, next);
  }


};