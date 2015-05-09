angular.module('fomo.addEvent', [])

.controller('AddController', ['$scope', '$log', 'AddEventService',
                                    function($scope, $log, AddEventService) {
  var categories = ['music', 'other'];
  $scope.event = {
    categories: categories,
    category: categories[0]
    // https://docs.angularjs.org/api/ng/input/input%5Bdatetime-local%5D
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  };
  $scope.submitEvent = function(){
    console.log("$scope.event", $scope.event);
    AddEventService.postEvent($scope.event);
  };
}]);
