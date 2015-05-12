angular.module('fomo.search', ['customFilters'])

.controller('searchController', ['$scope', '$log', 'SearchService',
  function($scope, $log, SearchService) {

    var categories = ['music', 'sports', 'other'];
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
}]);