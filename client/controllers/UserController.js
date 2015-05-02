angular.module('fomo.user', [])

.controller('UserController', ['$scope', 'UserService', function($scope, UserService) {
  $scope.getallEvents = function() {
    UserService.getallEvents()
    .success(function(data) {
      $scope.events = data;
      console.log('CONTROLLER: RESULTS FROM EVENTS:', $scope.events);
    })
  };
}]);
