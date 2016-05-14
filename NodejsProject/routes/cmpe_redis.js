
var redis = require("redis")
var ejs = require("ejs");
var client = redis.createClient(6379, 'team4jr.8pcr77.ng.0001.usw2.cache.amazonaws.com', {no_ready_check: true})

function addProductToCard(req, res) {
	var username = req.param("username");
	var productId = req.param("productId");
	
	var productList;
	client.get( username, function(err, reply) {
		if (reply == null) {
			var array = [];
			array.push(productId);
			productList = JSON.stringify(array);
			client.set(username, productList);
		} else {
			var pArrayJSON = reply;
			var array = JSON.parse(pArrayJSON);
			array.push(productId);
			productList = JSON.stringify(array);
			client.set(username, productList);
		}
		res.send(productList);
	});
}

function getShoppingCart(req, res) {
	var username = req.param("username");		
	client.get( username, function(err, reply) {
		res.send(reply);
	});
}

function redisTest() {
	client.set('test', 'Jagruti');
	console.log(client.get('test'));
}

function deleteFromShoppingCart(req, res) {
	var username = req.param("username");
	var productId = req.param("productId");
	var result;
	var productList;
	client.get( username, function(err, reply) {
		if (reply == null) {
			result = "{\"result\" : \"No Such USER ID\"}";
		} else {
			var pArrayJSON = reply;
			var array = JSON.parse(pArrayJSON);
			var index = array.indexOf(productId);
			if (index > -1) {
				array.splice(index, 1);
			}			
			productList = JSON.stringify(array);
			client.set(username, productList);
			result = productList;
		}
		res.send(result);
	});
}

function deleteAllCart(req, res) {
	var username = req.param("username");
	var result;
	var productList;
	client.get( username, function(err, reply) {
		if (reply == null) {
			result = "{\"result\" : \"No Such USER ID\"}";
		} else {		
			client.del(username,function(err,count){});
		}
		res.send(result);
	});
}

exports.deleteAllCart = deleteAllCart;
exports.redisTest = redisTest; 
exports.addProductToCard = addProductToCard;
exports.getShoppingCart = getShoppingCart;
exports.deleteFromShoppingCart = deleteFromShoppingCart;
