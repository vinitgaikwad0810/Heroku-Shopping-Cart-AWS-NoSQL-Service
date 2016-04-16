
var redis = require("redis")
var client = redis.createClient()


function redisTest() {
	client.set('test', 'Jagruti');
	console.log(client.get('test'));
}


exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.redisTest = redisTest; 