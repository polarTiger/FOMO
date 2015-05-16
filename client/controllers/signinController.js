angular.module('fomo.signin', [])

.controller('SigninController', ['$scope', '$http', '$state', '$log', '$cookies', '$cookieStore','UserService', 'LoggedInService', function($scope, $http, $state, $log, $cookies, $cookieStore, UserService, LoggedInService) {

  if (LoggedInService.isLoggedIn()) {
    $state.go('home');
  } else {
  $scope.signin = function() {
      var userObj = {
        username: $scope.user.username,
        password: $scope.user.password
      };

      $http.post('api/users/signin', userObj)
        .success(function(data, status, headers, config) {
          $log.log('success');
          LoggedInService.setLoggedIn(true);
          LoggedInService.setUserName(userObj.username)

          $state.go('home');
      })
      .error(function(data, status, headers, config) {
        $log.log('fail');
        $state.go('signup');
      });
    };
  }
}]);
