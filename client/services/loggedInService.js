angular.module('fomo.loggedinservice', [])

.factory('LoggedInService', ['$http', function($http) {
  var _loggedIn; 
  console.log("in LoggedInService");

  var setLoggedIn = function(isIn) {
    _loggedIn = isIn;
  };

  var isLoggedIn = function() {
    return _loggedIn;
  };

  var getLoggedIn = function(cb) {
    cb = cb || function(){};
    $http.get('/api/users/signedin')
        .success(function(data){
          _loggedIn = data;
          console.log(data);
          cb(data);
        });
  }

  _loggedIn = getLoggedIn();

  return {
    setLoggedIn: setLoggedIn,
    isLoggedIn: isLoggedIn,
    getLoggedIn: getLoggedIn
  };
}]);
