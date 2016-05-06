(function(){
	var app = angular.module("accApp",[]);
	
	var accController = function($scope, $http,$window){
		$scope.Login = function(){		
			$http({
				method: 'POST',
				url: '/login',
				data: {"email" : $scope.email, "password" : $scope.password}
			}).success(function(data){
																
					$window.location.assign('/getData');
					alert("You have logged in successfully !!!");
			}).error(function(data){
				alert("Error while logging in!!!");
			})
			
		}
		
	}
	
	app.controller("accController",accController);
}());