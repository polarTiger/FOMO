/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
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
  //$scope.user = $rootScope.root.user;
  $scope.getLoggedIn();

  console.log('NavController initialized');
  var bodyEl = document.body,
    content = document.querySelector('.content-wrap'),
    openbtn = document.getElementById('open-button'),
    closebtn = document.getElementById('close-button'),
    isOpen = false;
    console.log('openbtn: ', openbtn);
  function init() {
    initEvents();
  }

  function initEvents() {
    openbtn.addEventListener( 'click', toggleMenu );
    if(closebtn) {
      closebtn.addEventListener( 'click', toggleMenu );
    }

    // close the menu element if the target it´s not the menu element or one of its descendants..
    content.addEventListener( 'click', function(ev) {
      var target = ev.target;
      if( isOpen && target !== openbtn ) {
        toggleMenu();
      }
    } );
  }

  function toggleMenu() {
    if(isOpen) {
      classie.remove( bodyEl, 'show-menu' );
    }
    else {
      classie.add( bodyEl, 'show-menu' );
    }
    isOpen = !isOpen;
  }

  init();
  toggleMenu();

}]);
