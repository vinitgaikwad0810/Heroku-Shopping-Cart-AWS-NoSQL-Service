(function(){
	var app = angular.module("accApp",[]);
	
	var accController = function($scope, $http){
		
		$scope.Login = function(){
			console.log($scope.email, $scope.password);
			
			$http({
				method: 'POST',
				url: '/login',
				data: {"email" : $scope.email, "password" : $scope.password}
			}).success(function(data){
				console.log(data);
			})
			
		}
		
	}
	
	app.controller("accController",accController);
}());