angular.module('fomo.addeventservice', [])

.factory('AddEventService', ['$http', '$log','$filter', function($http, $log, $filter) {

  var postEvent = function(eventObject) {

    if (eventObject.eventdate) { // handles eventdate and eventtime, or just event date but no event time (defaults to 12:01 local)
      var UTCdate = eventObject.eventdate.toJSON().slice(0,10);
      var UTCeventtime = eventObject.eventtime ? eventObject.eventtime.toString().match(/\d{2}:\d{2}:\d{2}/)[0] : '00:01:00';
      var UTCeventdate = eventObject.eventdate.toString().replace(/\d{2}:\d{2}:\d{2}/,UTCeventtime);
      UTCeventdate = new Date(UTCeventdate).toJSON();
      console.log('UTCeventdate: ', UTCeventdate);
    }

    if (eventObject.notifydate) {
      var UTCnotifytime = eventObject.notifytime ? eventObject.notifytime.toString().match(/\d{2}:\d{2}:\d{2}/)[0] : '00:01:00';
      var UTCnotifydate = eventObject.notifydate.toString().replace(/\d{2}:\d{2}:\d{2}/,UTCnotifytime);
      UTCnotifydate = new Date(UTCnotifydate).toJSON();
      console.log('UTCnotifydate: ', UTCnotifydate);
    }

    var sendObject = {
      name: eventObject.name,
      info: eventObject.info,
      category: eventObject.category,
      link: eventObject.link,
      imgUrl: eventObject.imgUrl,
      eventdate: eventObject.eventdate ? UTCeventdate.slice(0,10) : null, // date and time converted to UTC time, ie. 7 or 8 hours ahead from Pacific
      eventtime: UTCeventdate ? UTCeventdate.slice(11,16) : null, // null when no event date, 12:01 local when no event time, or else user defined event time
      notifyinfo: eventObject.notifyinfo,
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

    console.log('SERVICE: GET_EVENTS: ', sendObject);

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
