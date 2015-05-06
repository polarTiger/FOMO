angular.module('fomo.eventservice', [])

.factory('EventService', ['$http', function($http) {
  var getEvent = function(eventId) {
    console.log('SERVICE: GET_EVENTS');
    //return $http.get('api/events/event/2')
    return $http.get('api/events/event/' + eventId)
      .success(function(resp) {
        return resp;
      })
      .error(function(err) {
        return err;
      });
  };
  var submitEmail = function(data) {
    console.log("EMAIL IN SERVICE: ", data);
    return $http.post('/event/' + data.eventId, data)
      .success(function() {
        return data;
      })
      .error(function(err){
        return err;
      });
  };
  return {
    getEvent: getEvent,
    submitEmail: submitEmail
  };
}]);
