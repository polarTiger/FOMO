angular.module('fomo.searchservice', [])

.factory('SearchService', ['$http', '$log', function($http, $log, $filter) {
  var _results = {};

  var searchWithQuery = function(query) {
    return $http({
      method: 'GET',
      url: '/api/events/search',
      params: {query: query}
    })

  };

  var results = function() {
    return _results;
  };

  return {
    searchWithQuery: searchWithQuery,
    results: results
  };

}]);
