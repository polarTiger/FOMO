angular.module('fomo.user', ['customFilters'])

.controller('UserController', ['$scope', 'UserService', '$state', function($scope, UserService, $state) {

  $scope.orderVariable = 'event_title';
  
  $scope.getallEvents = function() {
    UserService.getallEvents()
    .success(function(data) {
      $scope.events = data;
      console.log($scope.events);
    })
    .error(function(data, status, headers, config) {
      $state.go('signin');
    });
  };

  $scope.convertToLocalTime = function(date, time) {
    if (date) {
      var dbYearNotify = date.slice(0,4);
      var dbMonthNotify = parseInt(date.slice(5,7))-1;
      var dbDayNotify = date.slice(8,10);
      var dbHourNotify = time ? parseInt(time.slice(0,2)) : 0;
      var dbMinNotify = time ? parseInt(time.slice(3,5)) : 1;
    
      time = new Date(Date.UTC(dbYearNotify, dbMonthNotify, dbDayNotify, dbHourNotify, dbMinNotify));
      date = new Date(Date.UTC(dbYearNotify, dbMonthNotify, dbDayNotify, dbHourNotify, dbMinNotify));
      console.log(date);
      return date;
    }
    else {
      return "";
    }
  }
 
}]);
