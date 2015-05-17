angular.module('fomo.loggedinservice', [])

.factory('LoggedInService', ['$http', '$rootScope', '$log', function($http, $rootScope, $log) {
  var _loggedIn = false; 
  var _userName;
  if (!$rootScope.root) {
   $rootScope.root = {user:{username:null}}; 
  }

  var setLoggedIn = function(isIn) {
    $rootScope.root.loggedIn = isIn;
    _loggedIn = isIn;
  };

  var isLoggedIn = function() {
    return _loggedIn;
  };

  var getUserName = function() {
    return _userName;
  };

  var setUserName = function(username) {
    console.log("set username test ", username);
    $rootScope.root.user.username = username;
    _userName = username;
  };

  var getLoggedIn = function(cb) {
    console.log('get Logged in,');
    cb = cb || function(){};
    console.log('call server for loggin info');
    $http.get('/api/users/signedin')
      .success(function(data){
        setLoggedIn(Boolean(data));
        if (_loggedIn) {
          setUserName(data);
        } else {
          _userName = null;
        }
        cb(data);
      });
  };

  return {
    setLoggedIn: setLoggedIn,
    isLoggedIn: isLoggedIn,
    getLoggedIn: getLoggedIn,
    getUserName: getUserName,
    setUserName: setUserName
  };
}]);
