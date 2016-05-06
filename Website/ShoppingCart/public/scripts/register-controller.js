/**
 * New node file
 */
(function(){
	var app = angular.module("registerApp",[]);
	
	var registerController = function($scope, $http , $window){
		
		$scope.Register = function(){
			console.log($scope.fname,$scope.lname,$scope.email,$scope.mobileno,$scope.password);

			$http({
				method: 'POST',
				url: '/signup',
				data: {"fname" : $scope.fname,"lname" : $scope.lname, "email" : $scope.email, "password" : $scope.password, "mobileno" : $scope.mobileno},
				
			}).success(function(data){
				window.location.assign('/getData');
				window.alert("You are successfully Registered !!"+"\n"+"Please LogIn to continue shopping");
			}).error(function(data){
				alert("Registration Failed !!");
				alert(data);
			})
			
		}
		
	}
	
	app.controller("registerController",registerController);
}());


