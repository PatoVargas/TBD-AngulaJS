(function(){
	var app = angular.module('store', []);
	
	app.controller('ControladorRankingCamaras', [ '$http', function($http) {
		var store = this;
		store.camaras = [];
		
		$http.get('camaras.json').success(function(data){
			store.camaras = data;
		});	
	}]);
})();
