angular.module('fomo', ['ui.router'])


  .config(function($stateProvider, $urlRouterProvider) {
  // If an unknown route is entered, it redirects to the home page.
  $urlRouterProvider.otherwise('/home');
  // Routes to the home page
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: './views/mainPageView.html'
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
          templateUrl: './views/signupView.html'
          
        }
      }
    })
    .state('user', {
      url: '/user/:userId',
      templateUrl: './views/userView.html',
      controller: 'UserController'
    })
    .state('event', {
      url: '/event/:eventId',
      templateUrl: './views/eventId.html',
      controller: 'EventController'
    })
    .state('addevent', {
      url: '/addevent',
      templateUrl: './views/addEvent.html',
      controller: 'AddController'
    })
});
