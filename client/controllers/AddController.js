angular.module('fomo.addEvent', [])

.controller('AddController', ['$scope', '$log', 'AddEventService', 
                                    function($scope, $log, AddEventService) {
  var categories = ['music', 'other'];
  $scope.event = {
    categories: categories,
    category:categories[0]
  };
  $scope.submitEvent = function(){
    $log.log($scope.event);
    AddEventService.postEvent($scope.event);
  };
}]);
