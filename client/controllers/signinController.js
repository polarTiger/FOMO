angular.module('fomo.signin', [])

.controller('SigninController', ['$scope', '$http', '$cookies', '$state', '$log', 'UserService', function($scope, $http, $cookies, $state, $log, UserService) {

  $scope.signin = function() {
    var userObj = {
      username: $scope.user.username,
      password: $scope.user.password
    }

    $http.post('api/users/signin', userObj)
      .success(function(data, status, headers, config) {
        $log.log('success');
        $log.log($cookies.getAll());
        $state.go('home');
    })
    .error(function(data, status, headers, config) {
      $log.log('fail');
      $state.go('signup');

    });
  };
}]);