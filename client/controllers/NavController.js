angular.module('fomo.navcontroller', [])

.controller('NavController', ['$scope', '$http', '$state', 'LoggedInService', function($scope, $http, $state, LoggedInService) {

  $scope.logout = function() {
    $http.get('/api/users/signout')
      .success(function(data) {
        LoggedInService.setLoggedIn(false);
        $state.go('signin');
      });
  };

  $scope.isLoggedIn = function() {
    return LoggedInService.isLoggedIn();
  };
  $scope.getLoggedIn = function() {
    LoggedInService.getLoggedIn();
  };
  $scope.getUsername = function() {
    $scope.username = LoggedInService.getUserName();
  };
  $scope.getLoggedIn();

  var bodyEl = document.body,
      content = document.querySelector('.content-wrap'),
      openbtn = document.getElementById('open-button'),
      closebtn = document.getElementById('close-button'),
      isOpen = false;

  function init() {
    initEvents();
  }

  function initEvents() {
    openbtn.addEventListener( 'click', toggleMenu );
    if(closebtn) {
      closebtn.addEventListener( 'click', toggleMenu );
    }
  }

  function toggleMenu() {
    if(isOpen) {
      classie.remove( bodyEl, 'show-menu' );
    } else {
      classie.add( bodyEl, 'show-menu' );
    }
    isOpen = !isOpen;
  }

  init();
  toggleMenu();

}]);
