angular.module('fomo.results', ['customFilters'])

.controller('ResultsController', ['$scope', '$log', 'SearchService',
  function($scope, $log, SearchService) {

    $scope.orderVariable = 'event_title';
    // make a call for top 10 most subscribed event to the database
    $scope.genPopularEvent = function() {
      SearchService.searchPopular()
      .success(function(data,status){
        $scope.popularEvents = data;
      });
    };

    $scope.orderVariable = 'event_title';
    
    $scope.submit = function() {
      SearchService.searchWithQuery($scope.query)
        .success(function(data, status) {
          $log.log(data);
          $scope.events = data;
      });
    };
    $scope.genPopularEvent();
}]);
