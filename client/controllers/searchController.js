angular.module('fomo.search', ['customFilters'])

.controller('searchController', ['$scope', '$log', 'SearchService',
  function($scope, $log, SearchService) {
    
    $scope.submit = function() {
      SearchService.searchWithQuery($scope.query)
        .success(function(data, status) {
          $log.log(data);
          $scope.events = data;
      });
    };
}]);