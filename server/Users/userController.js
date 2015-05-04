var User = require('./userModel');
var bcrypt = require('bcrypt-nodejs');



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
         res.render('signup', {title: 'signup', errorMessage: 'username already exists'});
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
  }


};