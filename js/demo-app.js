(function(){
	var app = angular.module('demoapp', ['ngRoute', 'appServices']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        		// Rutas de vistas
                when('/cameraroll', {templateUrl: 'cameraroll.html',   controller: 'HomeCtrl'}).
                when('/actividad-reciente', {templateUrl: 'actividad-reciente.html',   controller: 'HomeCtrl'}).
                when('/album', {templateUrl: 'album.html',   controller: 'HomeCtrl'}).
                when('/buscador-camaras', {templateUrl: 'buscador-camaras.html',   controller: 'HomeCtrl'}).
                when('/favoritos', {templateUrl: 'favoritos.html',   controller: 'HomeCtrl'}).
                when('/fotos-de', {templateUrl: 'fotos-de.html',   controller: 'HomeCtrl'}).
                when('/fotos-desde', {templateUrl: 'fotos-desde.html',   controller: 'HomeCtrl'}).
                when('/fotos-recientes', {templateUrl: 'fotos-recientes.html',   controller: 'HomeCtrl'}).
                when('/mapa', {templateUrl: 'mapa.html',   controller: 'HomeCtrl'}).
                when('/mapa-mundial', {templateUrl: 'mapa-mundial.html',   controller: 'HomeCtrl'}).
                when('/photostream', {templateUrl: 'photostream.html',   controller: 'HomeCtrl'}).
                when('/subir-foto', {templateUrl: 'subir-foto.html',   controller: 'HomeCtrl'}).
                // Otras rutas
                when('/list', {templateUrl: 'list.html',   controller: 'ListCtrl'}).
                when('/detail/:itemId', {templateUrl: 'detail.html',   controller: 'DetailCtrl'}).
                when('/settings', {templateUrl: 'settings.html',   controller: 'SettingsCtrl'}).
                otherwise({redirectTo: '/cameraroll'});
	}]);

	app.controller('MainCtrl', function($scope, Page) {
	    console.log(Page);
	    $scope.page= Page; 
	});

    app.controller('loginCtrl', function($scope,loginService){
        $scope.msgtxt='';
        $scope.login=function(user){
            loginService.login(user,$scope);
        }
        
    });

    app.factory('loginService',function($http){
        return{
            login:function(user,scope){
                var $promise=$http.post('JSON/user.php',user);
                $promise.then(function(msg){
                    if(msg.data=='succes') scope.msgtxt='Bien';
                    else scope.msgtxt='Error';

                });
            }
        }

    });

	app.controller('HomeCtrl', function($scope, Page) {
	    Page.setTitle("Bienvenido");
	});

	app.controller('DemoCtrl', function($scope, Page) {
	    Page.setTitle("AngularJS Demo");
	    this.mensaje = "Hola Mundito!";
	});
	
	app.controller('ControladorRankingCamaras', [ '$http', function($http) {
		var store = this;
		store.camaras = [];
		
		$http.get('JSON/camaras.json').success(function(data){
			store.camaras = data;
		});	
	}]);

	var app = angular.module('appServices', []);

	app.factory('Page', function($rootScope) {
        var pageTitle = "Untitled";
        return {
            title:function(){
                return pageTitle;
            },
            setTitle:function(newTitle){
                pageTitle = newTitle;
            }
        }
    });
})();