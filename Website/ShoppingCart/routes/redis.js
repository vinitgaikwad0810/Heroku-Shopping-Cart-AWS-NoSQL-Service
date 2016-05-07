var ejs = require("ejs");
var session=require('client-sessions');
var request = require('sync-request');
var https = require("https");
var http = require("http");

exports.addProductIdToRedis = function(req, res) {	
	var email = req.session.email;
	var product = req.param("productId");
	
	var httpcall = request('POST', 'http://team4praj-env.us-west-2.elasticbeanstalk.com/addToCart', {
		  json: { username: email,
			  	  productId: product,
			  }
		});
		
	var json_responses = {"Status" : "success"};
	res.send(json_responses);
}
