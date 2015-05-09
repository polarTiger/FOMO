angular.module('fomo.loggedinservice', [])

.factory('LoggedInService', ['$http', function($http) {
  var _loggedIn; 

  var setLoggedIn = function(isIn) {
    _loggedIn = isIn;
  };

  var isLoggedIn = function() {
    return _loggedIn;
  };

  var getLoggedIn = function(cb) {
    console.log('get Logged in,');
    cb = cb || function(){};
    console.log('call server for loggin info');
    $http.get('/api/users/signedin')
        .success(function(data){
          _loggedIn = data;
          cb(data);
        });
  };

  getLoggedIn();

  return {
    setLoggedIn: setLoggedIn,
    isLoggedIn: isLoggedIn,
    getLoggedIn: getLoggedIn
  };
}]);
