angular.module('fomo.event', [])

.controller('EventController', ['$scope', '$http', '$log','$state', '$stateParams', '$cookies', '$cookieStore', 'EventService', 'LoggedInService', function($scope, $http, $log, $state, $stateParams, $cookies, $cookieStore, EventService, LoggedInService) {

  $scope.data = {};
  $scope.eventId = 'abc123'; // replace with actual eventId
  $scope.subBtn = true; // hides email button on initial load
  $scope.modifyEventBtn = true; // hides event form on initial load

  $scope.modifyInfoBtn = true;
  $scope.editInfo = false;
  $scope.editNotifyInfo = false;
  $scope.editNotifyDate = false;
  $scope.editNotifyTime = false;
  $scope.confirmTrigger = false;

  $scope.setEditAttribute = function(attr, value) {
    console.log(attr, value);
    $scope["edit" + attr] = value;
  };

  $scope.toggleConfirmTrigger = function() {
    
    $scope.confirmTrigger = !$scope.confirmTrigger;
  };

  $scope.getEvent = function() {
    EventService.getEvent($stateParams.eventID)
    .then(function(data) {
      $scope.data = data.data;
      $scope.data.event_infonew = $scope.data.event_info;
      $scope.data.notification_infonew = $scope.data.notification_info;

      if ($scope.data.notification_date) {
        var dbYearNotify = $scope.data.notification_date.slice(0,4);
        var dbMonthNotify = parseInt($scope.data.notification_date.slice(5,7))-1;
        var dbDayNotify = $scope.data.notification_date.slice(8,10);
        var dbHourNotify = $scope.data.notification_time ? parseInt($scope.data.notification_time.slice(0,2)) : 0;
        var dbMinNotify = $scope.data.notification_time ? parseInt($scope.data.notification_time.slice(3,5)) : 1;
        //var dbSec = data[i].notification_time ? parseInt(data[i].notification_time.slice(6,8)) : 0;
        $scope.data.notification_time = new Date(Date.UTC(dbYearNotify, dbMonthNotify, dbDayNotify, dbHourNotify, dbMinNotify));
        $scope.data.notification_date = new Date(Date.UTC(dbYearNotify, dbMonthNotify, dbDayNotify, dbHourNotify, dbMinNotify));
      }

      $scope.data.notification_datenew = $scope.data.notification_date;
      $scope.data.notification_timenew = $scope.data.notification_time;

      //console.log("EVENT DATE/TIME: " + dbYearNotify, dbMonthNotify, dbDayNotify, dbHourNotify, dbMinNotify);
      //console.log('CONTROLLER: RESULTS FROM EVENTS:', $scope.data);
    });
  };

  $scope.defaultText = function(inputarray) {
    for (var i = 0; i < inputarray.length; i++) {
      $scope.data[inputarray[i] + "new"] = $scope.data[inputarray[i]];
    }
  };

  $scope.subscribe = function() {
    $http.post('api/events/subscribe/'+ $stateParams.eventID)
      .success(function(data, status, headers, config) {
        $log.log('successfully subscribed');
        $scope.data.subscribed = true;
        // $log.log(data);
    })
    .error(function(data, status, headers, config) {
      $log.log('fail');
      $state.go('signin');
    });
  };

  $scope.unsubscribe = function() {
    $http.delete('api/events/unsubscribe/'+ $stateParams.eventID)
      .success(function(data, status, headers, config) {
        $log.log('successfully unsubscribed');
        $scope.data.subscribed = false;
        // $log.log(data);
    })
    .error(function(data, status, headers, config) {
      $log.log('fail');
      $state.go('signin');
    });
  };

  $scope.editEvent = function() {
    console.log('EDIT_EVENT');
    $scope.modifyEventBtn = !$scope.modifyEventBtn;

    $http.get('api/events/event/'+ $stateParams.eventID)
      .success(function(data, status, headers, config) {
        $log.log('success');
        $scope.eventData=data;
        $scope.eventData.eventcategories=[$scope.eventData.event_category];
    })
    .error(function(data, status, headers, config) {
      $log.log('fail');
    });
  };

  $scope.triggerEvent = function() {
    EventService.triggerEvent({params: {event_id: $stateParams.eventID}})
    .then(function() {
      $scope.data.fired = true;
    });
  };

  $scope.submitInfo = function() {
    $http.post('/api/events/editevent/'+$stateParams.eventID, {event_info: $scope.data.event_infonew})
        .success(function(data, status, headers, config) {
        $scope.data.event_info = $scope.data.event_infonew;
        console.log('success submit event_info');
      })
        .error(function(data, status, headers, config) {
        console.log('fail');
      });
  };


  $scope.submitNewNotificationDate = function() {
    $scope.data.notificationdate = $scope.data.notification_datenew;
    $scope.data.notificationtime = $scope.data.notification_timenew;
    console.log("$scope.data NOTIFICATION_DATE", $scope.data);

    EventService.updateNotificationDate($scope.data).then(function() {
      $scope.data.notification_date = $scope.data.notification_datenew;
      $scope.data.notification_time = $scope.data.notification_timenew;
    });
  };

  $scope.isLoggedIn = function() {
    return LoggedInService.isLoggedIn();
  };

}]);

