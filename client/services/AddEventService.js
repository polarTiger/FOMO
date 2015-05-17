angular.module('fomo.addeventservice', [])

.factory('AddEventService', ['$http', '$log','$filter', function($http, $log, $filter) {

  var postEvent = function(eventObject) {

    if (eventObject.notifydate) {
      var UTCnotifytime = eventObject.notifytime ? eventObject.notifytime.toString().match(/\d{2}:\d{2}:\d{2}/)[0] : '00:01:00';
      var UTCnotifydate = eventObject.notifydate.toString().replace(/\d{2}:\d{2}:\d{2}/,UTCnotifytime);
      UTCnotifydate = new Date(UTCnotifydate).toJSON();
    }
    console.log("eventObject", eventObject);
    var sendObject = {

      name: eventObject.name,
      info: eventObject.info,
      category: eventObject.category,
      link: eventObject.link,
      imgUrl: eventObject.imgUrl ? eventObject.imgUrl : null ,
      notifydate: eventObject.notifydate ? UTCnotifydate.slice(0,10) : null,
      notifytime: UTCnotifydate ? UTCnotifydate.slice(11,16) : null
      // date: UTCdate,
      // date: $filter('date')(eventObject.date, 'yyyy-MM-dd HH:mm Z'),
      // date: $filter('date')(eventObject.date, 'yyyy-MM-dd'),
      // filter date: https://docs.angularjs.org/api/ng/filter/date
      // notifyinfo: eventObject.notifyinfo,
      // notifydate: $filter('date')(eventObject.notifydate, 'yyyy-MM-dd'),
      // notifytime: $filter('date')(eventObject.notifytime, 'HH:mm') // format in military time
    };

    $http.post('/api/events/addevent', sendObject)
        .success(function(data, status, headers, config) {
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
