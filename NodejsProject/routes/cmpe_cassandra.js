
var https = require("https");
var request = require('sync-request');

function log(req,res){
	console.log(req.body);	
	/*
	var json = {
		    "level" : "debug",
		    "message" : "Hi"
		};*/

	var	json = {};
	json["level"] = "debug";
	json["message"] = "Hi";	
	

	var httpcall = request('POST', 'http://52.24.140.37:8888/log', {json: { data :JSON.stringify(json)}});		
	res.end();
 }

exports.log=log;	