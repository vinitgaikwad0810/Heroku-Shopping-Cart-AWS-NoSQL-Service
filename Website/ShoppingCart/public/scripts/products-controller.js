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
			alert($scope.Tees);
			var subproduct = $scope.Tees;
			$http({
				method: 'POST',
				url: '/renderMenProducts',
				data: {"Tees":$scope.Tees}	
			}).success(function(data){
																
					//$window.location.assign('/getData');
					
			}).error(function(data){
				
			})
			
		}
		
	}
	app.controller("products-controller",productController);
}());