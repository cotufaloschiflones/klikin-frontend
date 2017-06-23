// APP 
var klikin = angular.module('klikin', ['ui.router', 'ngResource', 'ngSanitize']);


// BLOQUE CONFIG
klikin.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider)
{
	var list = { 
	    name: 'list',
	    url : '/',
	    views : {
	    	"":{ // main view
	    		templateUrl: './views/list.html',
	    		//controller: 'mainController'
	    	}
	    }
	};

	
	var detailView = { 
	    name: 'detail',
	    url: '/detail/:name',
	    views : {
	    	"":{
			    templateUrl: './views/detail.html',
	    		controller: 'detailController'
	    	}
	    }
	};


	$stateProvider
	  .state(list)
	  .state(detailView)
	

	// si soporta activo la navegación sin hash
	if(window.history && window.history.pushState){
	    $locationProvider.html5Mode({
	    	enabled:true,
	    	requireBase: true
	    });
	}

}]);




// BLOQUE RUN
klikin.run(['$rootScope', function($rootScope){
	$rootScope._ = window._; // convierto lodash en una variable global
}])

