
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
  $urlRouterProvider.otherwise('/home');
  // Routes to the home page
  $stateProvider
    .state('home', {
      url: '/home',
        views: {
          nav: {
            templateUrl: './views/navView.html',
            controller: 'NavController'
            // http://stackoverflow.com/questions/29576063/how-to-attach-navbar-only-on-certain-pages-using-ui-router
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
        main_content: {
          templateUrl: './views/signinView.html',
          controller: 'SigninController'
        }
      }
    })
    .state('signup', {
      url: '/signup',
      views: {
        main_content: {
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
      url: '/event/:eventID',  // change to /event/:eventId
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

.controller("MainController", ['$scope', '$http', 'LoggedInService', '$rootScope', '$state', function($scope, $http, LoggedInService, $rootScope, $state) {
}]);
