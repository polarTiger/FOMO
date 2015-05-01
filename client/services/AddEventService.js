angular.module('fomo.addeventservice', [])

.factory('AddEventService', ['$http', '$log', function($http, $log) {
  var postEvent = function(eventObject) {
    console.log('SERVICE: GET_EVENTS');
    $http.post('/api/events/addevent', eventObject).
        success(function(data, status, headers, config) {
        $log.log('success');
      }).
      error(function(data, status, headers, config) {
          $log.log('fail');
      });
  };

  return {
    postEvent: postEvent
  };

}]);
