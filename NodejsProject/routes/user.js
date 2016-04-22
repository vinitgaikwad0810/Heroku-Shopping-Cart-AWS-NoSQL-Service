
var redis = require("redis")
var ejs = require("ejs");
var client = redis.createClient()


function redisTest() {
	client.set('test', 'Jagruti');
	console.log(client.get('test'));
}

function saveSignupDetails(req, res) {
	
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

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.redisTest = redisTest; 
exports.home = home;