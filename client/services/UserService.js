angular.module('fomo.userservice', [])

.factory('UserService', ['$http', function($http) {
  
  var getallEvents = function() {
    return $http.get('/api/events/myevents');
  };
  return {
    getallEvents: getallEvents
  };
}]);
