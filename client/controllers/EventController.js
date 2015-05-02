angular.module('fomo.event', [])

.controller('EventController', ['$scope', 'EventService', function($scope, EventService) {

  $scope.data = {};
  $scope.eventId = 'abc123'; // replace with actual eventId
  $scope.subBtn = true; // hides email button on initial load
  // $scope.test = { // test data, take out once database is running
  //   category: 'concert',
  //   tags: ['yolo', 'california', 'music festival', 'art'],
  //   title: "Coachella",
  //   info: 'The Coachella Valley Music and Arts Festival (commonly referred to as \
  //     Coachella or the Coachella Festival) is an annual music and arts festival held at the \
  //     Empire Polo Club in Indio, California, located in the Inland Empire\'s Coachella \
  //     Valley in the Colorado Desert. It was founded by Paul Tollett in 1999 and is \
  //     organized by Goldenvoice, a subsidiary of AEG Live. The event features many \
  //     genres of music, including rock, indie, hip hop, and electronic dance music, \
  //     as well as art installations and sculptures.',
  //   date: '08/07/2015',
  //   link: 'https://www.coachella.com',
  //   img: '../images/coachella.js'
  // };
  $scope.getEvent = function() {
    EventService.getEvent($scope.eventId)
    .then(function(data) {
      $scope.data = data.data;
      console.log('CONTROLLER: RESULTS FROM EVENTS:', $scope.data);
    })
  };
  $scope.notifyMe = function() {
    console.log('NOTIFY_ME');
    $scope.subBtn = !$scope.subBtn;
  };
  $scope.editEvent = function() { // to do, beyond MVP
    console.log('EDIT_EVENT');
  };
  $scope.addEmail = function() {
    $scope.email.eventId = $scope.eventId;
    console.log('EMAIL: ', $scope.email);
    $scope.subBtn = true;
    $scope.notifyBtn = true;
    EventService.submitEmail($scope.email);
  };
}]);

