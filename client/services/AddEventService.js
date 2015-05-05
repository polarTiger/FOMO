angular.module('fomo.addeventservice', [])

.factory('AddEventService', ['$http', '$log','$filter', function($http, $log, $filter) {
  var postEvent = function(eventObject) {
    var sendObject = {
      name: eventObject.name,
      info: eventObject.info,
      category: eventObject.category,
      link: eventObject.link,
      date: $filter('date')(eventObject.date, 'yyyy-MM-dd'),
      notifyinfo: eventObject.notifyinfo,
      notifydate: $filter('date')(eventObject.notifydate, 'yyyy-MM-dd'),
      notifytime: $filter('date')(eventObject.notifytime, 'HH:mm') // format in military time: https://docs.angularjs.org/api/ng/filter/date

    };
    $log.log(sendObject);
    console.log('SERVICE: GET_EVENTS');
    $http.post('/api/events/addevent', sendObject).
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
