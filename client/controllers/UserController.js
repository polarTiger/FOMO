angular.module('fomo.user', ['customFilters'])

.controller('UserController', ['$scope', 'UserService', '$state', function($scope, UserService, $state) {

  $scope.orderVariable = 'event_title';
  
  $scope.getallEvents = function() {
    UserService.getallEvents()
    .success(function(data) {
      $scope.events = data;
    })
    .error(function(data, status, headers, config) {
      $state.go('signin');
    });
  };
}]);
