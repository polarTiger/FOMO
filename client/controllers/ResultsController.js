angular.module('fomo.results', [])

.controller('ResultsController', ['$scope', '$log', 'SearchService', 
  function($scope, $log, SearchService) {
    
    SearchService.search()

}]);
