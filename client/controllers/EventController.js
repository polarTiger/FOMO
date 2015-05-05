angular.module('fomo.event', [])

.controller('EventController', ['$scope', '$http', '$log','$stateParams', 'EventService', function($scope, $http, $log, $stateParams, EventService) {

  $scope.data = {};
  $scope.eventId = 'abc123'; // replace with actual eventId
  $scope.subBtn = true; // hides email button on initial load
  $scope.modifyEventBtn = true; // hides event form on initial load

  $scope.getEvent = function() {
    EventService.getEvent($stateParams.eventID)
    .then(function(data) {
      $scope.data = data.data;
      console.log('CONTROLLER: RESULTS FROM EVENTS:', $scope.data);
    })
  };
  $scope.notifyMe = function() {
    console.log('NOTIFY_ME');
    $scope.subBtn = !$scope.subBtn;
  };
  $scope.editEvent = function() { // to do, beyond MVP
    console.log('EDIT_EVENT');
    $scope.modifyEventBtn = !$scope.modifyEventBtn;
    console.log($stateParams.eventID);
    
    $http.get('api/events/event/'+ $stateParams.eventID)
      .success(function(data, status, headers, config) {
      $log.log('success');
      $log.log(data);
      $scope.eventData=data;
      $scope.eventData.eventcategories=[$scope.eventData.event_category]
      //$scope.event.categories.push($scope.eventData.event_category);
      //$log.log($scope.event);
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

