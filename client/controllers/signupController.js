angular.module('fomo.signup', [])

.controller('SignupController', ['$scope', '$http', '$state', 'UserService', 'LoggedInService', function($scope, $http, $state, UserService, LoggedInService) {
  $scope.userAlreadyExist = false;
  $scope.passwordMismatch = false;
  $scope.user = {};
  $scope.getallEvents = function() {
    UserService.getallEvents()
    .success(function(data) {
      $scope.events = data;
    });
  };
  $scope.signup = function() {
    // http://www.ng-newsletter.com/posts/validations.html
    $scope.passwordMismatch = false;
    $scope.userAlreadyExist = false;
    $scope.emailAlreadyExist = false;

    if ($scope.user.password !== $scope.user.passwordValidation && $scope.signupForm.$valid) {
          $scope.passwordMismatch = true;
    } else if ($scope.signupForm.$valid) {
      var userObj = {
        username: $scope.user.username,
        password: $scope.user.password,
        email: $scope.user.email
      };

      $http.post('api/users/signup', userObj)
          .success(function(data, status, headers, config) {
          //$log.log('success');
          //LoggedInService.setLoggedIn(true);
          if (data === 'already exists') {
            $scope.userAlreadyExist = true;
          } else if(data === 'email exists') {
            $scope.emailAlreadyExist = true;
          } else {

          $scope.userAlreadyExist = false;
          $scope.emailAlreadyExist = false;
          $http.post('api/users/signin', userObj)
            .success(function(data, status, headers, config) {
              console.log('success');
              LoggedInService.setLoggedIn(true);
              LoggedInService.setUserName(userObj.username);
              $state.go('home');
            });
          }
        })
        .error(function(data, status, headers, config) {
          $log.log('fail');
        });
    } else {
      $scope.signupForm.submitted = true;
    }
  };
}]);
