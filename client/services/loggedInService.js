angular.module('fomo.loggedinservice', [])

.factory('LoggedInService', ['$http', function($http) {
  var _loggedIn = false;

  var toggleLogIn = function() {
    _loggedIn = !_loggedIn;
  };

  var isLoggedIn = function() {
    return _loggedIn;
  };

  var getLoggedIn = function(cb) {
    $http.get('/api/users/signedin')
        .success(function(data){
          console.log(data);
          cb(data);
        });
  }

  return {
    toggleLogIn: toggleLogIn,
    isLoggedIn: isLoggedIn,
    getLoggedIn: getLoggedIn
  };
}]);
