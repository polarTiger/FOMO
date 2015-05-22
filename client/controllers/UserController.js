angular.module('fomo.user', ['customFilters'])

.controller('UserController', ['$scope', 'UserService', '$state', function($scope, UserService, $state) {

  $scope.orderVariable = 'event_title';
  
  $scope.getallEvents = function() {
    UserService.getallEvents()
    .success(function(data) {
      $scope.events = data;
      console.log($scope.events);

      if ($scope.events.notification_date) {
        var dbYearNotify = $scope.events.notification_date.slice(0,4);
        var dbMonthNotify = parseInt($scope.events.notification_date.slice(5,7))-1;
        var dbDayNotify = $scope.events.notification_date.slice(8,10);
        var dbHourNotify = $scope.events.notification_time ? parseInt($scope.events.notification_time.slice(0,2)) : 0;
        var dbMinNotify = $scope.events.notification_time ? parseInt($scope.events.notification_time.slice(3,5)) : 1;
        //var dbSec = data[i].notification_time ? parseInt(data[i].notification_time.slice(6,8)) : 0;
        $scope.events.notification_time = new Date(Date.UTC(dbYearNotify, dbMonthNotify, dbDayNotify, dbHourNotify, dbMinNotify));
        $scope.events.notification_date = new Date(Date.UTC(dbYearNotify, dbMonthNotify, dbDayNotify, dbHourNotify, dbMinNotify));
      }
    })
    .error(function(data, status, headers, config) {
      $state.go('signin');
    });
  };
 
}]);
