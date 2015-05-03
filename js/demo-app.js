var app = angular.module('demoapp', ['ui.router', 'demoapp.controllers', 'demoapp.services']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('inicio', {
        url:'/',
        templateUrl: 'inicio.html'
        //controller: 'ControladorPrincipal'
    })

	$urlRouterProvider.otherwise('/');
}]);