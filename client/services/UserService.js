angular.module('fomo.userservice', [])

.factory('UserService', ['$http', function($http) {
  var getallEvents = function(eventId) {
    console.log('SERVICE: GET_EVENTS');
    return $http.get('api/events/event/2')
    // return $http.get('api/events/event/' + eventId)
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
