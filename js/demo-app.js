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

    app.config( [
        '$compileProvider',
        function( $compileProvider )
        {   
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
            // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
        }
    ]);

    app.directive('modalDialog', function($window, $templateCache, $compile, $http) {
      return {
        restrict: 'EA',
        scope: {
          show: '=',
          modalUser: '=',
          saveUser: '&',
          templateUser: '@'
        },
        replace: true, // Replace with the template below
        //transclude: true, // we want to insert custom content inside the directive
        link: function(scope, element, attrs) {

          $http.get(scope.templateUser, {cache: $templateCache}).success(function(tplContent){
                    element.replaceWith($compile(tplContent)(scope));                
                  });
                  
          scope.dialogStyle = {};
          if (attrs.width) {
            scope.dialogStyle.width = attrs.width + '%';
            scope.dialogStyle.left = ( ( 100 - attrs.width ) / 2 ) + '%';
          }
          if (attrs.height) {
            scope.dialogStyle.height = attrs.height + '%';
            scope.dialogStyle.top = ( ( 100 - attrs.height ) / 2 ) + '%';
          }
            
          scope.hideModal = function() {
            scope.show = false;
          };

          scope.clone = function(obj) {
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }
            var temp = obj.constructor(); // give temp the original obj's constructor
            for (var key in obj) {
                temp[key] = scope.clone(obj[key]);
            }
            return temp;
          };

          var tempUser = scope.clone(scope.modalUser);
          
          scope.save = function() {
            scope.saveUser(scope.modalUser);
            scope.show = false;
            $http.post('JSON/nuevo.json', {id:2,texto:'este es un comentario',user:'pato'}); 
          };
          
          scope.cancel = function() {
            scope.modalUser = scope.clone(tempUser);
            scope.show = false;
          };
        }
      };
    });

    app.controller('popupCtrl', function($scope, $window) {
      $scope.modalShown = false;
      $scope.userMod = {};
      $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
      }
    });

    app.factory('loginService',function($http, sessionService){
        return{
            login:function(user,scope){
                var $promise=$http.post('JSON/user.php',user);
                $promise.then(function(msg){
                    var uid=msg.data;
                    if(uid=='succes'){ 
                        scope.msgtxt='Bien';
                        sessionService.set('user',uid);
                        window.location.href="vistausuario.html"; 
                    }   
                    else{
                        window.location.href="iniciarsesion.html"; 
                    } 

                });
            }
        }

    });

    app.factory('sessionService', ['$http', function($http){
        return{
            set:function(key,value){
                return sessionStorage.setItem(key,value);
            },
            get:function(){
                return sessionStorage.getItem(key);
            },
            destroy:function(){
                return sessionStorage.removeItem(key);
            }
        };
    }]);

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

    app.controller('FotosCtrl', [ '$http', function($http) {
        var store = this;
        store.fotos = [];
        
        $http.get('JSON/fotos.json').success(function(data){
            store.fotos = data;
        }); 
    }]);


    app.controller('ComentariosCtrl', [ '$http', function($http) {
        var store = this;
        store.comentarios = [];
        
        $http.get('JSON/comentarios.json').success(function(data){
            store.comentarios = data;
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