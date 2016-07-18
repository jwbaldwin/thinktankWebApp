(function(){
	var app = angular.module('navigation-bar', []);

	//Nav bar directive
	//Nav bar directive
	app.directive("navigationBar", function(){
		return{
			restrict:'E',
			templateUrl:"/views/navBar.html"
		}
	});
})();