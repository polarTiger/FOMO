angular.module('fomo.search', ['customFilters'])

.controller('searchController', ['$scope', '$log', 'SearchService',
  function($scope, $log, SearchService) {

    $scope.orderVariable = 'event_title';
    $scope.searched = false;
    var categories = ['music', 'sports', 'outdoors', 'food', 'tech', 'travel', 'business', 'health', 'other'];
    $scope.queryresult = [];
    $scope.event = {
      categories: categories,
      category: categories[0]
      // https://docs.angularjs.org/api/ng/input/input%5Bdatetime-local%5D
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    };

    $scope.submit = function() {
      $log.log($scope);
      var normalizedCategcory = $scope.event.category === "all" ? null : $scope.event.category;
      SearchService.searchWithQuery($scope.query, normalizedCategcory)
        .success(function(data, status) {
          $log.log(data);
          $scope.events = data;
      });
    };

    $scope.liveSearchEventTitle = function(){
      $log.log($scope);
      var normalizedCategcory = $scope.event.category === "all" ? null : $scope.event.category;
      SearchService.searchWithQuery($scope.event.name, normalizedCategcory)
        .success(function(data, status) {
          $scope.queryresult = data;
          if (data.length > 0) {
            $scope.searched = true;
          } else {
            $scope.searched = false;
          }
          //$scope.events = data;
      });
    };

    $scope.eventIsInQuery = function() {
      for (var i = 0; i < $scope.queryresult.length; i++) {
        if ($scope.event.name === $scope.queryresult[i].event_title) {
          return true;
        }
      }
      return false;
    };
}]);
