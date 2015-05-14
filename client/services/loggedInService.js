angular.module('fomo.loggedinservice', [])

.factory('LoggedInService', ['$http', '$rootScope', '$log', function($http, $rootScope, $log) {
  var _loggedIn; 
  var _userName;

  var setLoggedIn = function(isIn) {
    _loggedIn = isIn;
  };

  var isLoggedIn = function() {
    return _loggedIn;
  };

  var getUserName = function() {
    return _userName;
  };

  var setUserName = function(username) {
    $rootScope.user.username = username;
    _userName = username;
  }

  var getLoggedIn = function(cb) {
    console.log('get Logged in,');
    cb = cb || function(){};
    console.log('call server for loggin info');
    $http.get('/api/users/signedin')
        .success(function(data){
          _loggedIn = Boolean(data);
          if (_loggedIn) {
            setUserName(data.username);
          } else {
            _userName = null;
          }
          cb(data);
        });
  };


  getLoggedIn();

  return {
    setLoggedIn: setLoggedIn,
    isLoggedIn: isLoggedIn,
    getLoggedIn: getLoggedIn,
    getUserName: getUserName,
    setUserName: setUserName

  };
}]);
