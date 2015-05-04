var userController = require('./userController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js

  app.post('/signin', userController.signInPost);


  app.post('/signup', userController.signUpPost);

  app.get('/signedin', userController.userPlaceHolder);
};


