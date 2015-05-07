angular.module('fomo.event', [])

.controller('EventController', ['$scope', '$http', '$log','$state', '$stateParams', '$cookies', '$cookieStore', 'EventService', function($scope, $http, $log, $state, $stateParams, $cookies, $cookieStore, EventService) {

  $scope.data = {};
  $scope.eventId = 'abc123'; // replace with actual eventId
  $scope.subBtn = true; // hides email button on initial load
  $scope.modifyEventBtn = true; // hides event form on initial load

  $scope.getEvent = function() {
    EventService.getEvent($stateParams.eventID)
    .then(function(data) {
      $scope.data = data.data;
      $log.log('haha, ', $cookies['connect.sid']);
      console.log('CONTROLLER: RESULTS FROM EVENTS:', $scope.data);
    });
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
      $state.go('signup');
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
      $state.go('signup');
    });
  };

  $scope.editEvent = function() { // to do, beyond MVP
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

  $scope.modifyEvent = function() {
    $http.post('/api/events/editevent/'+$stateParams.eventID, $scope.eventData)
        .success(function(data, status, headers, config) {
        $scope.modifyEventBtn = true;
        $log.log('success');
      })
        .error(function(data, status, headers, config) {
        $log.log('fail');
      });
  };
  
  $scope.addEmail = function() {
    $scope.email.eventId = $scope.eventId;
    console.log('EMAIL: ', $scope.email);
    $scope.subBtn = true;
    $scope.notifyBtn = true;
    EventService.submitEmail($scope.email);
  };
}]);

