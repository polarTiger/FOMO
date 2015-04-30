angular.module('fomo.eventservice', [])

.factory('EventService', ['$http', function($http) {
  var getEvent = function(eventId) {
    console.log('SERVICE: GET_EVENTS');
    return $http.get('/event/:' + eventId)
              .success(function(data) {
                return data;
              })
              .error(function(err) {
                return err;
              });
  };

  return {
    getEvent: getEvent
  };

}]);
