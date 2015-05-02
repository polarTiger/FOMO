angular.module('fomo.userservice', [])

.factory('UserService', ['$http', function($http) {
  var getallEvents = function() {
    console.log('SERVICE: GET_USER_EVENTS');
    return $http.get('/api/events/myevents')
      .success(function(resp) {
        return resp;
      })
      .error(function(err) {
        return err;
      });
  };
  return {
    getallEvents: getallEvents
  };
}]);
