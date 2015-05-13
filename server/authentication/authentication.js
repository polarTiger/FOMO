//If user is not logged in, loggedOutBlock sends a 403 error code.
var loggedOutBlock = function(req, res, next) {
  if(!req.session.passport.user) {
    res.send(403);
  } else{
    next();
  }
};

module.exports.loggedOutBlock = loggedOutBlock;
