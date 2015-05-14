angular.module('fomo.userservice', [])

.factory('UserService', ['$http', function($http) {
  
  var getallEvents = function() {
    console.log('SERVICE: GET_USER_EVENTS');
    return $http.get('/api/events/myevents');
  };
  return {
    getallEvents: getallEvents
  };
}]);
