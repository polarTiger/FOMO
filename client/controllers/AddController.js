angular.module('fomo.addEvent', [])

.controller('AddController', ['$scope', '$log', '$state', 'AddEventService',
                                    function($scope, $log, $state, AddEventService) {
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
    $state.go('user');
  };
  $scope.test = function(){
    console.log('haha changed!');
  };
}]);
