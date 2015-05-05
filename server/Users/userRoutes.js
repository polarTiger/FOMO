var userController = require('./userController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js

  app.post('/signin', userController.signInPost, function(req, res) {
                            res.redirect('/');
                          });


  app.post('/signup', userController.signUpPost);

  app.get('/signedin', userController.userPlaceHolder);

};


