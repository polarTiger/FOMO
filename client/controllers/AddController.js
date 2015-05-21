angular.module('fomo.addEvent', [])
.controller('AddController', ['$scope', '$log', '$state', 'AddEventService', 'SearchService',
    function($scope, $log, $state, AddEventService, SearchService) {
  var categories = ['music', 'sports', 'outdoors', 'food', 'tech', 'travel', 'business', 'health', 'other'];
  $scope.queryresult = [];
  $scope.eventText = true;
  $scope.eventInfo = false;
  $scope.eventLink = false;
  $scope.eventUrl = false;
  $scope.eventDate = false;

  $scope.toggleEventText = function () {
    if ($scope.eventText === true) {
      $scope.eventText = !$scope.eventText;
    }
  };

  $scope.toggleEventInfo = function () {
    $scope.eventInfo = !$scope.eventInfo;
  };

  $scope.toggleEventLink = function () {
    $scope.eventLink = !$scope.eventLink;
  };

  $scope.toggleEventUrl = function () {
    $scope.eventUrl = !$scope.eventUrl;
  };

  $scope.toggleEventDate = function () {
    $scope.eventDate = !$scope.eventDate;
  };

  $scope.event = {
    categories: categories,
    category: categories[0]
    // https://docs.angularjs.org/api/ng/input/input%5Bdatetime-local%5D
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  };

  $scope.submitEvent = function(){
    //console.log("$scope.event", $scope.event);
    AddEventService.postEvent($scope.event);
    $state.go('user');
  };

  // perform Live search on the event title to see if the event title already exists in db
  $scope.liveSearchEventTitle = function(){
    SearchService.searchWithQuery($scope.event.name)
      .success(function(data, status) {
        // queryresult will be rendered on front end partially
        $scope.queryresult = data;
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
