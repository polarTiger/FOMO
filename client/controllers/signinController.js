angular.module('fomo.signin', [])

.controller('SigninController', ['$scope', '$http', '$log', 'UserService', function($scope, $http, $log, UserService) {

  $scope.signin = function() {
    var userObj = {
      username: $scope.user.username,
      password: $scope.user.password
    }

    $http.post('api/users/signin', userObj)
      .success(function(data, status, headers, config) {
      $log.log('success');
    })
    .error(function(data, status, headers, config) {
      $log.log('fail');
    });
  };
}]);