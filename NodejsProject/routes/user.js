
var redis = require("redis")
var ejs = require("ejs");
var client = redis.createClient()



function addProductToCard(req, res) {
	var username = req.param("username");
	var productId = req.param("productId");
	
	var pArrayJSON = client.get(username);
	var array = JSON.parse(pArrayJSON);
	arry.add(productId);
	var jsonStr = JSON.stringify(array);
	client.set(username, jsonStr);		
}


function redisTest() {
	client.set('test', 'Jagruti');
	console.log(client.get('test'));
}

function saveSignupDetails(req, res) {	
	client.set("username", req.param("username"));
	client.set("password", req.param("password"));
	
}

function signup(req, res) {
	ejs.renderFile("./views/signup.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}

function home(req, res) {
	ejs.renderFile("./views/login.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}

function charts(req, res) {
	ejs.renderFile("./views/chart.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}


function authenticate(req, res) {
	var usernameGot = req.param("username");
	var passwordGot = req.param("password");
	
	if (client.get("username") == usernameGot && client.get("password") == passwordGot) {
		var json = "{'status', '200'}";
		res.send(json);
	} else {
		res.send("{'status', '400'}");
	}
}


exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.authenticate = authenticate;
exports.redisTest = redisTest; 
exports.home = home;
exports.signup = signup;
exports.charts = charts;
exports.addProductToCard = addProductToCard;