//loading the 'login' angularJS module
var app = angular.module('myApp', []);
//defining the login controller
app.controller('validateCtrl', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	$scope.invalid_login = true;
	$scope.unexpected_error = true;
	$scope.submitfb = function() {
		$http({
			method : "POST",
			url : '/afterSignIn',
			data : {
				"email" : $scope.email,
				"inputPassword" : $scope.inputPassword
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
			else if(data.statusCode == 200)
				//Making a get call to the '/redirectToHomepage' API
				window.location.assign("/SuccessLogin"); 
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};
})





