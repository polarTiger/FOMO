angular.module('fomo.addEvent', [])
.controller('AddController', ['$scope', '$log', '$state', 'AddEventService', 'SearchService', 'LoggedInService',
    function($scope, $log, $state, AddEventService, SearchService, LoggedInService) {

  if (!LoggedInService.isLoggedIn()) {
    $state.go('signin');
    return;
  }

  $scope.MAX_TITLE = 50;
  $scope.MAX_INFO = 1000;
  $scope.MAX_LINK = 200;
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
  };

  $scope.submitEvent = function(){
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
