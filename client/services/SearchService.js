angular.module('fomo.searchservice', [])

.factory('AddEventService', ['$http', '$log', function($http, $log, $filter) {
  var _results = {};

  var searchWithQuery = function(query) {
    return $http({
      method: 'GET',
      url: '/api/events/search',
      params: {query: query}
    })
    .success(function(res) {
      _results = res.data;
    })
    .error({
      _results = [{}]
    });

  };

  var results = function() {
    return _results;
  };

  return {
    searchWithQuery: searchWithQuery,
    results: results;
  };

}]);
