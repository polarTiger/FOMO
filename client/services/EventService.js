angular.module('fomo.eventservice', [])

.factory('EventService', ['$http', '$stateParams', '$log', '$state', function($http, $stateParams, $log, $state) {
  var getEvent = function(eventId) {
    console.log('SERVICE: GET_EVENTS');
    return $http.get('api/events/event/' + eventId)
      .success(function(resp) {
        return resp;
      })
      .error(function(err) {
        return err;
      });
  };

  var submitEmail = function(data) {
    return $http.post('/event/' + data.eventId, data)
      .success(function() {
        return data;
      })
      .error(function(err){
        return err;
      });
  };

  var updateNotificationDate = function(eventObject) {

    if (eventObject.notificationdate) { // handles eventdate and eventtime, or just event date but no event time (defaults to 12:01 local)
      var UTCdate = eventObject.notificationdate.toJSON().slice(0,10);
      var UTCeventtime = eventObject.notificationtime ? eventObject.notificationtime.toString().match(/\d{2}:\d{2}:\d{2}/)[0] : '00:01:00';
      var UTCeventdate = eventObject.notificationdate.toString().replace(/\d{2}:\d{2}:\d{2}/,UTCeventtime);
      UTCeventdate = new Date(UTCeventdate).toJSON();
    }

    var sendObject = {
      notification_date: eventObject.notificationdate ? UTCeventdate.slice(0,10) : null, // date and time converted to UTC time, ie. 7 or 8 hours ahead from Pacific
      notification_time: UTCeventdate ? UTCeventdate.slice(11,16) : null // null when no event date, 12:01 local when no event time, or else user defined event time
    };

    return $http.post('/api/events/editnotification/'+$stateParams.eventID, sendObject)
      .success(function(data, status, headers, config) {
        console.log('success update event date');
        // $state.go('user');
      })
      .error(function(data, status, headers, config) {
        $log.log('fail');
      });
  };

  var triggerEvent = function(params) {

    return $http.get('/api/events/triggerevent/', {params: {event_id: $stateParams.eventID}})
    .success(function() {
        $log.log('successfully triggered');
    })
    .error(function() {
      $log.log('fail');
    });
  };

  return {
    getEvent: getEvent,
    submitEmail: submitEmail,
    updateNotificationDate: updateNotificationDate,
    triggerEvent: triggerEvent
  };
}]);

