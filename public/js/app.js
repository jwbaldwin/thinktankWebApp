//Declares the initial angular module "myIdeaApp". Module grabs other controllers and directives.
var app = angular.module('myIdeaApp', ['navigation-bar', 'ask-box', 'ngRoute', 'ngAnimate'])

//Configures Angular routing - Showing the right views
.config(function($routeProvider){
	
	$routeProvider.when('/login', {
		templateUrl: '/views/login.html',
	}).when('/#/', {
		templateUrl: '/views/askBox.html',
	}).when('/chat/:id', {
		templateUrl: '/views/chat.html',
		controller: 'chatController',
		controllerAs: 'chatCtrl',
	}).when('/comment/:id', {
		templateUrl: '/views/comment.html',
		controller: 'commentController',
		controllerAs: 'commentCtrl',
	}).otherwise({redirectTo:'/#/'});
});
