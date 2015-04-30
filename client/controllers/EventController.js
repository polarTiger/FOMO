angular.module('fomo.event', [])

.controller('EventController', ['$scope', 'EventService', function($scope, EventService) {

  $scope.data = {};
  $scope.splash = 'EVENT HEADER';

  $scope.getEvent = function() {
    EventService.getEvent('abc123')
    .then(function(data) {
      // console.log("DATA from GETEVENT: ", data);
      // $scope.data.links = data;
      console.log('CONTROLLER: RESULTS FROM EVENTS:', data);
    })
  }
}]);

