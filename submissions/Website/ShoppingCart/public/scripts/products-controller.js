(function(){
	var app = angular.module("productsApp",[]);
	
	var productController = function($scope, $http, $window){
		$scope.getMenTeesProducts = function(){			
			$http({
				method: 'GET',
				url: '/TeesProducts',
			}).success(function(data){	
				$window.location.assign('/TeesProducts');																							
				}).error(function(data){
			})			
		}		
	}
	app.controller("products-controller",productController);
}());