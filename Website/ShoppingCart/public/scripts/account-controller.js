(function(){
	var app = angular.module("accApp",[]);
	
	var accController = function($scope, $http,$window){
		
		$scope.Login = function(){
			console.log($scope.email, $scope.password);
			
			$http({
				method: 'POST',
				url: 'http://52.37.112.11:8888/getpassword',
				data: {"uname" : $scope.email, "password" : $scope.password}
			}).success(function(data){
				if(data.result==="success"){
					$window.location.assign('/');
				}else{
					alert("Error!! Invalid Username or Password");
				}
			})
			
		}
		
	}
	
	app.controller("accController",accController);
}());