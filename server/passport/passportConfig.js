var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var User = require('../Users/userModel');




passport.use(new LocalStrategy(function(username, password, done) {
   console.log('here inside passport.use');
   new User({username: username}).fetch().then(
      function(data) {
         var user = data;
         if(user === null) {
            return done(null, false, {message: 'Invalid username or password'});
         } else {
            user = data.toJSON();
            if(!bcrypt.compareSync(password, user.password)) {
               return done(null, false, {message: 'Invalid username or password'});
            } else {
               return done(null, user);
            }
         }
      });
}));

passport.serializeUser(function(user, done) {
   done(null, user.username);
});

passport.deserializeUser(function(username, done) {
   new User({username: username}).fetch().then(function(user) {
      done(null, user);
   });
});

module.exports = passport;