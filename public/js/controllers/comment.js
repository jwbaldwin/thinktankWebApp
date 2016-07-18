var app = angular.module('myIdeaApp');

app.controller('commentController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
  var roomid = $routeParams.id; 
  //Get a single post by the roomid aka objectID
  var getPost = function(id){
    $http.get('/posts/post/' + id).success(function(response) {
      $scope.post = response;
    })
  };
  // On Entrance to the page
  $(document).ready(function(){
    getPost(roomid);
  });
}]);