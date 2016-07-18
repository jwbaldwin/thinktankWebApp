(function(){
	var app = angular.module('ask-box', []);

	//Nav bar directive
	//Nav bar directive
	app.directive("askBox", function(){
		return{
			restrict:'E',
			templateUrl:"/views/askBox.html",
			controller: ['$scope', '$http', function($scope, $http){
				var refresh = function() {
					$http.get('/posts').success(function(response) {
						console.log("I got the data I reqesuted");
						$scope.posts = response;
					});
				}
				//Call immediately so we get the data on page load
				refresh();

				$scope.submit = function() {
				if ($scope.post.text) {
					console.log($scope.post);
					$http.post('/posts', $scope.post).success(function (response) {
						refresh();
						$scope.post.text = '';
					});
				}
				};

				$scope.remove = function(id) {
					console.log("Delete: " + id);
					$http.delete('/posts/' + id);
					refresh();
				};

				$scope.upvote = function(id) {
					$http.put('/posts/upvote/' + id).success(function (response) {
						console.log("Response: " + response);
						refresh();
					})
				};

				$scope.downvote = function(id) {
					$http.put('/posts/downvote/' + id).success(function (response) {
						console.log("Response: " + response);
						refresh();
					})
				}
			}],
			controllerAs: 'thoughtCtrl'
		}
	});
})();