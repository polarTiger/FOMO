angular.module('fomo.loggedinservice', [])

.factory('LoggedInService', ['$http', function($http) {
  var _loggedIn = false;

  var setLoggedIn = function(isIn) {
    _loggedIn = isIn;
  };

  var isLoggedIn = function() {
    return _loggedIn;
  };

  var getLoggedIn = function(cb) {
    $http.get('/api/users/signedin')
        .success(function(data){
          _loggedIn = data;
          console.log(data);
          cb(data);
        });
  }

  return {
    setLoggedIn: setLoggedIn,
    isLoggedIn: isLoggedIn,
    getLoggedIn: getLoggedIn
  };
}]);
