/**
 * New node file
 */
angular.module('myApp', []).controller('myController', function($scope, $http)
{
	$scope.fName = '';
	$scope.lName = '';
	$scope.passw1 = '';
	$scope.passw2 = '';
	$scope.items = [ {
		id : 1,
		name : 'x men t shirt',
		price : 10
	}, {
		id : 2,
		name : 'superman fullsleve t-shirt',
		price : 10
	}, {
		id : 3,
		name : 'white shirt',
		price : 7
	}, {
		id : 4,
		name : 'black shirt',
		price : 4
	}, {
		id : 5,
		name : 'jeans blue',
		price : 11
	}, {
		id : 5,
		name : 'socks',
		price : 3
	}, {
		id : 5,
		name : 'hankerchief',
		price : 2
	}, {
		id : 5,
		name : 'gloves',
		price : 4
	}, {
		id : 5,
		name : 'shoes',
		price : 10
	}, {
		id : 6,
		name : 'round neck plainn t shirt',
		price : 1
	} ];
	$scope.cartItems = [];
	$scope.total = 0;
	$scope.ordered = false
	$scope.submit = function(itemName, itemPrice)
	{
		$http({
			method : "POST",
			url : '/addProduct',
			data : {
				"itemName" : itemName,
				"itemPrice" : itemPrice
			}
		}).success(function(data)
		{
			// checking the response data for statusCode
			$scope.storeItems = data.items;
			$scope.total = data.total;
		}).error(function(error)
		{
			alert("error");
		});
	};
	
	$scope.deleteProduct = function(itemId)
	{
		$http({
			method : "POST",
			url : '/deleteProduct',
			data : {
				"itemId" : itemId
			}
		}).success(function(data)
		{
			// checking the response data for statusCode
			$scope.storeItems = data.items;
			$scope.total = data.total;
		}).error(function(error)
		{
			alert("error");
		});
	};

	$http.get('/getCartProducts').success(function(data)
	{
//		alert("getProducts");
		$scope.storeItems = data.items;
		$scope.total = data.total;
	})
});