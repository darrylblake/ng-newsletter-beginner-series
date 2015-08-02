var app = angular.module('myApp', []);
var apiKey = 'MDIwMDQwNzgyMDE0Mzg0NzM4OTMwYzkzNw001';
var nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';


app.controller('PlayerController', function($scope, $http) {
  $scope.playing = false;
  $scope.audio = document.createElement('audio');
  $scope.audio.src = 'http://www.stephaniequinn.com/Music/Hungarian%20Dance.mp3';
  $scope.play = function() {
    $scope.audio.play();
    $scope.playing = true;
  };
  $scope.stop = function() {
    $scope.audio.pause();
    $scope.playing = false;
  };
  $scope.audio.addEventListener('ended', function() {
    $scope.$apply(function() {
      $scope.stop()
    });
  });

  $http({
    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
  }).success(function(data, status) {
    $scope.programs = data.list.story;
    // Now we have a list of the stories (data.list.story)
    // in the data object that the NPR API 
    // returns in JSON that looks like:
    // data: { "list": {
    //   "title": ...
    //   "story": [
    //     { "id": ...
    //       "title": ...
  }).error(function(data, status) {
    // Some error occurred
  });

});

app.controller('RelatedController', ['$scope', function($scope) {
}])


app.controller('MyController', function($scope) {
  $scope.person = { name: "Ari Lerner" };
  var updateClock = function() {
    $scope.clock = new Date();
  };
  $timeout(function updateTime() {
    $scope.$apply(updateClock);
    $timeout(updateTime(), 1000);
  }, 1000);

  updateClock();
});