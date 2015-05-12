var loggedOutBlock = function(req, res, next) {
  console.log("in loggedOutBlock");
  if(!req.session.passport.user) {
    res.send(403);
  } else{
    next();
  }
}

module.exports.loggedOutBlock = loggedOutBlock;
