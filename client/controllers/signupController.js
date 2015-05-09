angular.module('fomo.signup', [])

.controller('SignupController', ['$scope', '$http', '$state', 'UserService', 'LoggedInService', function($scope, $http, $state, UserService, LoggedInService) {
  $scope.getallEvents = function() {
    UserService.getallEvents()
    .success(function(data) {
      $scope.events = data;
      console.log('CONTROLLER: RESULTS FROM EVENTS:', $scope.events);
    });
  };

  $scope.signup = function() {
    var userObj = {
      username: $scope.user.username,
      password: $scope.user.password,
      email: $scope.user.email
    };

    $http.post('api/users/signup', userObj)
      .success(function(data, status, headers, config) {
        //$log.log('success');
        //LoggedInService.setLoggedIn(true);
        $state.go('signin');
      })
      .error(function(data, status, headers, config) {
        //$log.log('fail');
      });
  };
}]);
