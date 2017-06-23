'use strict';

klikin.controller('mainController', ['$scope', 'Comercios', function($scope, Comercios){
    $scope.comercios = [];

    Comercios.get().$promise.then(function(resp)
    {
       $scope.comercios = resp;
    });

}]);


klikin.controller('detailController', ['$scope', 'utils', '$stateParams', function($scope, utils, $stateParams){
    // la vista al top
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    var slug = $stateParams.name;
    var nameCommerce = slug.replace(/-/g, " "); // Saco el nombre original
    var comercios = $scope.$parent.comercios;
    
    $scope.comercio = comercios[_.findIndex(comercios, function(o) { return o.name.toLowerCase() == nameCommerce; })]; // con lodash busco el comercio entre el array de comercios
    //console.log($scope.comercio.social)

    $scope.getLength = function(obj) {
        return Object.keys(obj).length;
    }

    $scope.nextSlide = function($event){
		//console.log("next");
		var active = utils.index( document.querySelector(".imagenes li.active"));
		var total = document.querySelectorAll(".imagenes li").length - 1;
		if (active === total) {
			$scope.changeSlide($event, 0);
		}else {
			$scope.changeSlide($event, active+1)
		}
	}
	$scope.prevSlide = function($event){
		//console.log("prev");
		var active = utils.index( document.querySelector(".imagenes li.active"));
		var total = document.querySelectorAll(".imagenes li").length - 1;
		if (active === 0) {
			$scope.changeSlide($event, total);
		}else {
			$scope.changeSlide($event, active-1)
		}
	}
	$scope.changeSlide = function($event, index)
	{
		// si viene del click del boton o de las keys <- -> 
		var slide = ($event !== undefined ) ? angular.element($event.target) : angular.element(document.querySelectorAll(".navigation li")[index]);

		if (slide.hasClass("active")) return false;

		var imagenes = angular.element(document.querySelectorAll(".imagenes li"));
		var imagen = angular.element(document.querySelectorAll(".imagenes li")[index]);
		var slides = angular.element(document.querySelectorAll(".navigation li"));

		imagenes.removeClass("active");
		slides.removeClass("active");
		imagen.addClass("active");
		slide.addClass("active");
	}

	

	document.addEventListener("keyup", function(event){
		if (event.keyCode == 37) $scope.prevSlide(); // ArrowLeft		
		if (event.keyCode == 39) $scope.nextSlide(); // ArrowRight
	}, false);
}]);

