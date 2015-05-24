angular.module('fomo', ['ui.router', 'fomo.event',
                      'fomo.addEvent', 'fomo.eventservice',
                      'fomo.addeventservice', 'fomo.user', 'fomo.userservice',
                      'fomo.addeventservice', 'fomo.results',
                      'fomo.searchservice',
                      'fomo.signup', 'fomo.navcontroller',
                      'fomo.signin',
                      'fomo.search',
                      'fomo.loggedinservice',
                      'ngCookies'])

.config(function($stateProvider, $urlRouterProvider) {
  // If an unknown route is entered, it redirects to the home page.
  $urlRouterProvider.otherwise('/signin');
  // Routes to the home page
  var loggedIn = ['$q', 'LoggedInService', '$rootScope', function ($q, LoggedInService, $rootScope) {
      $rootScope.changing = $rootScope.changing || {"name":'signin'};
      var deferred = $q.defer();
      LoggedInService.getLoggedIn(function(){
        if (!LoggedInService.isLoggedIn()) {
          deferred.resolve();
          $rootScope.changing["name"] = null;

        } else {
          deferred.reject('logged in');
          $rootScope.changing["name"] = null;
        }
      });
      return deferred.promise;
    }];

  $stateProvider
    .state('home', {
      url: '/home',
        views: {
          nav: {
            templateUrl: './views/navView.html',
            controller: 'NavController'
          },
          main_content: {
            templateUrl: './views/resultsView.html',
            controller: 'ResultsController'
          }
        }
    })
    .state('signin', {
      url: '/signin',
      views: {
        lp_content: {
          templateUrl: './views/signinView.html',
          controller: 'SigninController'
        }

      },
      resolve: {
        loggedIn: loggedIn
      }
    })
    .state('signup', {
      url: '/signup',
      views: {
        lp_content: {
          templateUrl: './views/signupView.html',
          controller: 'SignupController'
        }
      }
    })
    .state('search', {
      url: '/search',
      views: {
        nav: {
           templateUrl: './views/navView.html',
           controller: 'NavController'
        },
        main_content: {
          templateUrl: './views/searchView.html',
          controller: 'searchController'
        }
      }
    })
    .state('user', {
      url: '/user',
      views: {
        nav: {
           templateUrl: './views/navView.html',
           controller: 'NavController'
        },
        main_content: {
          templateUrl: './views/userView.html',
          controller: 'UserController'
        }
      }
    })
    .state('event', {
      url: '/event/:eventID',
      views: {
        nav: {
           templateUrl: './views/navView.html',
           controller: 'NavController'
        },
        main_content: {
          templateUrl: './views/eventView.html',
          controller: 'EventController'
        }
      }
    })
    .state('addevent', {
      url: '/addevent',
      views: {
        nav: {
           templateUrl: './views/navView.html',
           controller: 'NavController'
        },
        main_content: {
          templateUrl: './views/addEventView.html',
          controller: 'AddController'
        }
      }
  });
})
.run( function($rootScope,$state, $location) {
  $rootScope.scopename = $state;
  $rootScope.location = $location;
   // register listener to watch route changes
  $rootScope.$on('$stateChangeError', function () {
     // Redirect user to our home page
    $state.go('home');
  });
})
.controller("MainController", ['$scope', '$http', 'LoggedInService', '$rootScope', '$state', function($scope, $http, LoggedInService, $rootScope, $state) {

}]);
