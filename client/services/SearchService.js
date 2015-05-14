angular.module('fomo.searchservice', [])

.factory('SearchService', ['$http', '$log', function($http, $log, $filter) {
  var _results = {};

  var searchWithQuery = function(query, category) {
    return $http({
      method: 'GET',
      url: '/api/events/search',
      params: {query: query, category: category}
    });
  };

  //search for top 10 most subscribed events
  var searchPopular = function() {
    return $http({
      method: 'GET',
      url: '/api/events/popularevent'
    });
  };
  
  return {
    searchWithQuery: searchWithQuery,
    searchPopular: searchPopular
  };
}]);
