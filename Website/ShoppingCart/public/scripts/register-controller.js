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
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': 'http://localhost:3000',
					'Access-Control-Allow-Credentials': 'true',
					'Access-Control-Allow-Methods':'POST, GET, OPTIONS, PUT, DELETE, HEAD',
					 //'Content-Type': 'Accept'
					},
					crossDomain:true
			
			}).success(function(data){
				console.log(data);
			})
			
		}
		
	}
	
	app.controller("registerController",registerController);
}());


