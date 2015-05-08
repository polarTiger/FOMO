var userController = require('./userController.js');

module.exports = function (app) {

  app.post('/signin', userController.signInPost, function(req, res) {
    req.session.loggedIn = true;
    res.redirect('/');
  });

  app.post('/signup', userController.signUpPost);

  app.get('/signedin', userController.signedIn);

  app.get('/signout', userController.signout);

};


