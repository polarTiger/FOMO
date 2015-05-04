angular.module('fomo.signup', [])

.controller('SignupController', ['$scope', '$http', 'UserService', function($scope, $http, UserService) {
  $scope.getallEvents = function() {
    UserService.getallEvents()
    .success(function(data) {
      $scope.events = data;
      console.log('CONTROLLER: RESULTS FROM EVENTS:', $scope.events);
    })
  };

  $scope.signup = function() {
    var userObj = {
      username: $scope.user.username,
      password: $scope.user.password,
      email: $scope.user.email
    }

    $http.post('api/users/signup', userObj).
      success(function(data, status, headers, config) {
<<<<<<< HEAD
      //$log.log('success');
    }).
    error(function(data, status, headers, config) {
      //$log.log('fail');
=======
      $log.log('success');
    }).
    error(function(data, status, headers, config) {
      $log.log('fail');
>>>>>>> [feature] implement the signup front end and backend
    });
  };
}]);
