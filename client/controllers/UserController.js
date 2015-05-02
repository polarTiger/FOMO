angular.module('fomo.user', [])

.controller('UserController', ['$scope', 'UserService', function($scope, UserService) {
  $scope.data = {};
  $scope.data.test = "hello";
  $scope.getallEvents = function() {
    EventService.getallEvents()
    .then(function(data) {
      $scope.data = data.data;
      console.log('CONTROLLER: RESULTS FROM EVENTS:', $scope.data);
    })
  };
}]);
