/**
 * New node file
 */
(function(){
	var app = angular.module("registerApp",[]);
	
	var registerController = function($scope, $http){
		
		$scope.Register = function(){
			console.log($scope.fname,$scope.lname,$scope.email,$scope.mobileno,$scope.password);

			$http({
				method: 'POST',
				url: 'http://52.37.112.11:8888/newuser',
				data: {"fname" : $scope.fname,"lname" : $scope.lname, "uname" : $scope.email, "password" : $scope.password, "mobileno" : $scope.mobileno},
				
			}).success(function(data){
				window.alert("You are successfully Registered !!"+"\n"+"Please LogIn to continue shopping");
			}).fail(function(data){
				alert("Registration Failed !!");
			})
			
		}
		
	}
	
	app.controller("registerController",registerController);
}());


