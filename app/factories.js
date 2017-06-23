'use strict';

klikin.factory('Comercios', ['$resource', function( $resource ) 
{
	//this.url = "https://s3-eu-west-1.amazonaws.com/developers-tests/commerces.json";
	this.url = "/js/service.json";
	this.params = {
	};

	this.actions = {
		get : { method:'GET', isArray: true, interceptor : {responseError : function(response){console.log(response)}}}
	};


	return $resource(this.url, this.params, this.actions);
}]);


klikin.factory('utils', [function(){

	var index = function (node) {
		var tagElem = node.tagName.toLowerCase()
		var siblings = node.parentNode.querySelectorAll(tagElem);
	    return Array.prototype.indexOf.call(siblings, node);
	}
	return {
		index : index
	}
}]);
