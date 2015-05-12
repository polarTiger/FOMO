angular.module('fomo.search', ['customFilters'])

.controller('searchController', ['$scope', '$log', 'SearchService',
  function($scope, $log, SearchService) {

    var categories = ['music', 'sports', 'other'];
    $scope.queryresult = [];
    $scope.event = {
      categories: categories,
      category: categories[0]
      // https://docs.angularjs.org/api/ng/input/input%5Bdatetime-local%5D
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    };
    
    $scope.submit = function() {
      SearchService.searchWithQuery($scope.query, $scope.event.category)
        .success(function(data, status) {
          $log.log(data);
          $scope.events = data;
      });
    };

    $scope.liveSearchEventTitle = function(){
      SearchService.searchWithQuery($scope.event.name)
        .success(function(data, status) {
          $scope.queryresult = data;
          //console.log($scope.event.name);
          //console.log(' SEARCH CONTROLLER get the result from db ', data);
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