
var https = require("https");
var request = require('sync-request');

function log(req,res){
	var data = req.body;

	/*
	var json = {
		    "level" : "debug",
		    "message" : "Hi"
		};*/
		//var data1 = JSON.parse(req.body)

		//console.log(data1);

//console.lgo(data1.level);
	var	json1 = {};
	json1["level"] = data.level;
	json1["message"] = data.message;	
	
	var httpcall = request('POST', 'http://52.24.140.37:8888/log', {json: { data :JSON.stringify(json1)}});		
	res.end();
	
 }

exports.log=log;	


// curl -H "Content-Type: application/json" -X POST -d '{"level":"debug","message":"Faisal is here"}' http://localhost:8888/log

//curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/api/login
