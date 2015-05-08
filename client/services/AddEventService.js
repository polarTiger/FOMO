angular.module('fomo.addeventservice', [])

.factory('AddEventService', ['$http', '$log','$filter', function($http, $log, $filter) {
  var postEvent = function(eventObject) {
    var UTCdate = eventObject.date.toJSON().slice(0,10);
    console.log("UTCdate : ", UTCdate);
    var UTCnotifytime = eventObject.notifytime.toString().match(/\d{2}:\d{2}:\d{2}/)[0];
    var UTCnotifydate = eventObject.notifydate.toString().replace(/\d{2}:\d{2}:\d{2}/,UTCnotifytime );
    UTCnotifydate = new Date(UTCnotifydate).toJSON();
    console.log(UTCnotifydate );
    var sendObject = {
      name: eventObject.name,
      info: eventObject.info,
      category: eventObject.category,
      link: eventObject.link,
      date: UTCdate,
      notifyinfo: eventObject.notifyinfo,
      notifydate: UTCnotifydate.slice(0,10),
      notifytime: UTCnotifydate.slice(11,16) // format in military time: https://docs.angularjs.org/api/ng/filter/date

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
