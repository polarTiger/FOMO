angular.module('fomo.event', [])

.controller('EventController', ['$scope', 'EventService', function($scope, EventService) {

  $scope.data = {};
  $scope.splash = 'EVENT HEADER';
  $scope.test = {
    category: 'concert',
    tags: ['yolo', 'california', 'music'],
    title: "Coachella",
    info: 'The Coachella Valley Music and Arts Festival (commonly referred to as \
      Coachella or the Coachella Festival) is an annual music and arts festival held at the \
      Empire Polo Club in Indio, California, located in the Inland Empire\'s Coachella \
      Valley in the Colorado Desert. It was founded by Paul Tollett in 1999 and is \
      organized by Goldenvoice, a subsidiary of AEG Live. The event features many \
      genres of music, including rock, indie, hip hop, and electronic dance music, \
      as well as art installations and sculptures.',
    date: '08/07/2015',
    link: 'https://www.coachella.com',
    img: '../images/coachella.js'
  }
  $scope.getEvent = function() {
    EventService.getEvent('abc123')
    .then(function(data) {
      // console.log("DATA from GETEVENT: ", data);
      // $scope.data.links = data;
      console.log('CONTROLLER: RESULTS FROM EVENTS:', data);
    })
  }
}]);

