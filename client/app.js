
angular.module('fomo', ['ui.router', 'fomo.event',
                      'fomo.addEvent', 'fomo.eventservice',
                      'fomo.addeventservice', 'fomo.user', 'fomo.userservice',
                      'fomo.addeventservice', 'fomo.results',
                      'fomo.searchservice',
                      'fomo.signup',
                      'fomo.signin',
                      'fomo.loggedinservice',
                      'ngCookies'])

.config(function($stateProvider, $urlRouterProvider) {
  // If an unknown route is entered, it redirects to the home page.
  $urlRouterProvider.otherwise('/signin');
  // Routes to the home page
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: './views/resultsView.html',
      controller: 'ResultsController'
    })
    .state('signin', {
      url: '/signin',
      views: {
        'main-content': {
          templateUrl: './views/signinView.html',
          controller: 'SigninController'
        }
      }
    })
    .state('signup', {
      url: '/signup',
      views: {
        'main-content': {
          templateUrl: './views/signupView.html',
          controller: 'SignupController'
        }
      }
    })
    .state('user', {
      url: '/user',
      templateUrl: './views/userView.html',
      controller: 'UserController'
    })
    .state('event', {
      url: '/event/:eventID',  // change to /event/:eventId
      templateUrl: './views/eventView.html',
      controller: 'EventController'
    })
    .state('addevent', {
      url: '/addevent',
      templateUrl: './views/addEventView.html',
      controller: 'AddController'
    });
})

.controller("MainController", ['$scope', '$http', 'LoggedInService', '$state', function($scope, $http, LoggedInService, $state) {
  $scope.logout = function() {
    console.log('signout attempt');
    $http.get('/api/users/signout')
      .success(function(data) {
        console.log("logout");
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
  $scope.getLoggedIn();
}]);
