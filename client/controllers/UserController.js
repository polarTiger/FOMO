angular.module('fomo.user', ['customFilters'])

.controller('UserController', ['$scope', 'UserService', '$state', function($scope, UserService, $state) {
  $scope.getallEvents = function() {
    UserService.getallEvents()
    .success(function(data) {
      $scope.events = data;
      console.log('CONTROLLER: RESULTS FROM EVENTS:', $scope.events);
    })
    .error(function(data, status, headers, config) {
      $state.go('signin');
    });
  };
}]);
