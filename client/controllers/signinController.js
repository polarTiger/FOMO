angular.module('fomo.signin', [])

<<<<<<< HEAD
.controller('SigninController', ['$scope', '$http', '$state', '$log', 'UserService', function($scope, $http, $state, $log, UserService) {
=======
.controller('SigninController', ['$scope', '$http', '$log', 'UserService', function($scope, $http, $log, UserService) {
>>>>>>> [bug] trouble login

  $scope.signin = function() {
    var userObj = {
      username: $scope.user.username,
      password: $scope.user.password
    }

    $http.post('api/users/signin', userObj)
      .success(function(data, status, headers, config) {
<<<<<<< HEAD
        $log.log('success');
        $state.go('home');
    })
    .error(function(data, status, headers, config) {
      $log.log('fail');
      $state.go('signup');

=======
      $log.log('success');
    })
    .error(function(data, status, headers, config) {
      $log.log('fail');
>>>>>>> [bug] trouble login
    });
  };
}]);