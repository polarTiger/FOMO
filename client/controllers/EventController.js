angular.module('fomo.event', [])

.controller('EventController', ['$scope', '$stateParams', 'EventService', function($scope, $stateParams, EventService) {

  $scope.data = {};
  $scope.eventId = 'abc123'; // replace with actual eventId
  $scope.subBtn = true; // hides email button on initial load

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
  };
  $scope.addEmail = function() {
    $scope.email.eventId = $scope.eventId;
    console.log('EMAIL: ', $scope.email);
    $scope.subBtn = true;
    $scope.notifyBtn = true;
    EventService.submitEmail($scope.email);
  };
}]);

