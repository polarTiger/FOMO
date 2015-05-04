var User = require('./userModel');
var bcrypt = require('bcrypt-nodejs');
<<<<<<< HEAD
var passport = require('../passport/passportConfig');
=======
>>>>>>> [feature] implement the signup front end and backend



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
         res.end('already exists');
=======
         res.render('signup', {title: 'signup', errorMessage: 'username already exists'});
>>>>>>> [feature] implement the signup front end and backend
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
  }

>>>>>>> [feature] implement the signup front end and backend

};