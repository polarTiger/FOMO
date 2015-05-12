angular.module('fomo.event', [])

.controller('EventController', ['$scope', '$http', '$log','$state', '$stateParams', '$cookies', '$cookieStore', 'EventService', function($scope, $http, $log, $state, $stateParams, $cookies, $cookieStore, EventService) {

  $scope.data = {};
  $scope.eventId = 'abc123'; // replace with actual eventId
  $scope.subBtn = true; // hides email button on initial load
  $scope.modifyEventBtn = true; // hides event form on initial load

  $scope.modifyInfoBtn = true;
  $scope.editInfo = false;
  $scope.editDate = false;
  $scope.editTime = false;



  $scope.setEditAttribute = function(attr, value) {
    console.log(attr, value);
    $scope["edit" + attr] = value;
  };

  $scope.getEvent = function() {
    EventService.getEvent($stateParams.eventID)
    .then(function(data) {
      $scope.data = data.data;
      $scope.data.event_infonew = $scope.data.event_info;

      if ($scope.data.event_date) {
        var dbYear = $scope.data.event_date.slice(0,4);
        var dbMonth = parseInt($scope.data.event_date.slice(5,7))-1;
        var dbDay = $scope.data.event_date.slice(8,10);
        var dbHour = $scope.data.event_time ? parseInt($scope.data.event_time.slice(0,2)) : 0;
        var dbMin = $scope.data.event_time ? parseInt($scope.data.event_time.slice(3,5)) : 1;
        //var dbSec = data[i].notification_time ? parseInt(data[i].notification_time.slice(6,8)) : 0;
        $scope.data.event_time = new Date(Date.UTC(dbYear, dbMonth, dbDay, dbHour, dbMin));
        $scope.data.event_date = new Date(Date.UTC(dbYear, dbMonth, dbDay, dbHour, dbMin));
      }

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

      console.log("EVENT DATE/TIME: " + dbYear, dbMonth, dbDay, dbHour, dbMin);
      console.log("NOTIFICATION DATE/TIME: " + dbYearNotify, dbMonthNotify, dbDayNotify, dbHourNotify, dbMinNotify);
      console.log('CONTROLLER: RESULTS FROM EVENTS:', $scope.data);
    });
  };

  $scope.defaultText = function(input) {
    $scope.data[input + "new"] = $scope.data[input];
  };

  $scope.subscribe = function() {
    $http.post('api/events/subscribe/'+ $stateParams.eventID)
      .success(function(data, status, headers, config) {
        $log.log('success');
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
        $log.log('success');
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
      //$scope.event.categories.push($scope.eventData.event_category);
      //$log.log($scope.event);
    })
    .error(function(data, status, headers, config) {
      $log.log('fail');
    });
  };

  $scope.triggerEvent = function() {
    $http.get('/api/events/triggerevent/', {params: {event_id: $stateParams.eventID}});
  };

  // $scope.modifyEvent = function() {
  //   $http.post('/api/events/editevent/'+$stateParams.eventID, $scope.eventData)
  //       .success(function(data, status, headers, config) {
  //       $scope.modifyEventBtn = true;
  //       $log.log('success');
  //     })
  //       .error(function(data, status, headers, config) {
  //       $log.log('fail');
  //     });
  // };

  $scope.submitInfo = function() {
    $http.post('/api/events/editevent/'+$stateParams.eventID, {event_info: $scope.data.event_infonew})
        .success(function(data, status, headers, config) {
        $scope.data.event_info = $scope.data.event_infonew;
        console.log('success submit info');
      })
        .error(function(data, status, headers, config) {
        console.log('fail');
      });
  };

  $scope.submitNewDate = function() {
    $scope.data.eventdate = $scope.data.event_date;
    $scope.data.eventtime = $scope.data.event_time;
    console.log("$scope.data", $scope.data);

    EventService.updateEventDate($scope.data);
  };

  $scope.addEmail = function() {
    $scope.email.eventId = $scope.eventId;
    //console.log('EMAIL: ', $scope.email);
    $scope.subBtn = true;
    $scope.notifyBtn = true;
    EventService.submitEmail($scope.email);
  };
}]);

