var User = require('./userModel');
var bcrypt = require('bcrypt-nodejs');
<<<<<<< HEAD
<<<<<<< HEAD
var passport = require('../passport/passportConfig');
=======
>>>>>>> [feature] implement the signup front end and backend
=======
var passport = require('../passport/passportConfig');
>>>>>>> [bug] trouble login



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
<<<<<<< HEAD
<<<<<<< HEAD
         res.end('already exists');
=======
         res.render('signup', {title: 'signup', errorMessage: 'username already exists'});
>>>>>>> [feature] implement the signup front end and backend
=======
         res.end('user already exist');
>>>>>>> [feature] add signup and signin handling from both front end and backend
      } else {
         //****************************************************//
         // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
         //****************************************************//
         var password = user.password;
         var hash = bcrypt.hashSync(password);

         var signUpUser = new User({username: user.username,
          password: hash,
          email: user.email
         });

         signUpUser.save().then(function(model) {
<<<<<<< HEAD
            res.end();
         });  
      }
   });
  },

  signInPost : 
    passport.authenticate('local', { failureRedirect: '/login'})
    
=======
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

>>>>>>> [feature] implement the signup front end and backend

};