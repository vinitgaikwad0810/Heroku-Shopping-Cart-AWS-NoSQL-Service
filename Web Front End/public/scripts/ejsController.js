(function(){
	var app = angular.module("ejsAPP",[]);
	
	var ejsController = function($scope, $http){
		$scope.getProducts = function(){
			
			var subproduct = $scope.Tees;
			$http({
				method: 'GET',
				url: '/renderMenProducts',
				data: {}	
			}).success(function(data){
																
					//$window.location.assign('/getMenProductPage');
					
			}).error(function(data){
				
			})
			
		}
		
	}
	app.controller("products-controller",productController);
}());