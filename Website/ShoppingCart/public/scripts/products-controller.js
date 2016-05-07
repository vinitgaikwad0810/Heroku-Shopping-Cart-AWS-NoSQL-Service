/**
 * New node file
 
(function(){
	var app = angular.module("productsApp",[]);
	var productController = function($scope,$http){
		$scope.getProducts = function(){
			$http({
				method: 'GET',
				url:'/renderMenProducts',
			}).success(function(data){
				console.log("Get Successful");
			})	
		}	
	}
});*/


(function(){
	var app = angular.module("productsApp",[]);
	
	var productController = function($scope, $http){
		$scope.getProducts = function(){
			
			var subproduct = $scope.Tees;
			$http({
				method: 'POST',
				url: '/renderMenProducts',
				data: {}	
			}).success(function(data){
																
					$window.location.assign('/getMenProductPage');
					
			}).error(function(data){
				
			})
			
		}
		
	}
	app.controller("products-controller",productController);
}());