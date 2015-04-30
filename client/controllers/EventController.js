angular.module('fomo.event', [])

.controller('EventController', ['$scope', function($scope) {
  $scope.splash = 'EVENT HEADER';
  console.log('EVENT_CONTROLLER called');
}]);

