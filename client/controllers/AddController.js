angular.module('fomo.addEvent', [])

.controller('AddController', ['$scope', '$log', function($scope, $log) {
  var categories = ['music', 'other'];
  $scope.event = {
    categories: categories,
    category:categories[0],
    name:'',
    info:''
  };
  $log.log('ADD CONTROL called');
  $scope.submitEvent = function(){
    $log.log($scope.event);
  };
}]);
