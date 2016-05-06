(function(){
	var app = angular.module("accApp",[]);
	
	var accController = function($scope, $http,$window){
		
		
		
		
		$scope.Login = function(){
			console.log($scope.email, $scope.password);
			
			$http({
				method: 'POST',
				url: '/login',
				data: {"email" : $scope.email, "password" : $scope.password}
			}).success(function(data){
				if(data.result==="success"){
					alert(data.result);
									
					$window.location.assign('/getData');
					alert("You have logged in successfully !!!");
				}else{
					alert("Error!! Invalid Username or Password");
				}
			})
			
		}
		
	}
	
	app.controller("accController",accController);
}());