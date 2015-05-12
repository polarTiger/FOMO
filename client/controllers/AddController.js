angular.module('fomo.addEvent', [])
.controller('AddController', ['$scope', '$log', '$state', 'AddEventService', 'SearchService',
                                    function($scope, $log, $state, AddEventService, SearchService) {
  var categories = ['music', 'sports', 'other'];
  $scope.queryresult = [];
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
  $scope.liveSearchEventTitle = function(){
    SearchService.searchWithQuery($scope.event.name)
                    .success(function(data, status) {
                      $scope.queryresult = data;
                      console.log($scope.event.name);
                      console.log(' get the result from db ', data);
                      //$scope.events = data;
    });
  };
}]);
