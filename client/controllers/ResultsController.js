angular.module('fomo.results', [])

.controller('ResultsController', ['$scope', '$log', 'SearchService', 
  function($scope, $log, SearchService) {
    
    $scope.submit = function() {
      SearchService.searchWithQuery($scope.query)
                    .success(function(data, status) {
                      $log.log(data);
                      $scope.events = data;
                    });
    }

}]);
