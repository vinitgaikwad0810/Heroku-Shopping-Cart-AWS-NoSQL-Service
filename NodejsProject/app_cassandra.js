
var express = require('express');
var app = express();
var fs = require("fs");
var assert = require('assert');

var https = require("https");
var request = require('sync-request');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
         extended: true
         
        }));
        app.use(bodyParser.json());
        app.use(function(req, res, next) {
                  res.header("Access-Control-Allow-Origin", "*");
                  res.header('Access-Control-Allow-Methods', "*");
                  res.header('Access-Control-Allow-Headers', "Content-Type");
                  //res.header("Access-Control-Allow-Headers", "*");
                  next();
                });





	/*
	var json = {
		    "level" : "debug",
		    "message" : "Hi"
		};*/
		//var data1 = JSON.parse(req.body)

		//console.log(data1);

//console.lgo(data1.level);
/*
	var	json1 = {};
	json1["level"] = data1.level;
	json1["message"] = data1.message;	
	console.log("Hiiii "+json1);*/	
/*
	var httpcall = request('POST', 'http://52.24.140.37:8888/log', {json: { data :JSON.stringify(req.body)}});		
	res.end();
	
 }*/


 app.post('/log', function(req,res){

 	var	json1 = {};
	json1["level"] = req.body.level;
	json1["message"] = req.body.message;
   	//console.log(req.body.level);
	//console.log(req.body.message);	



	var httpcall = request('POST', 'http://52.24.140.37:8888/log', {json: { data :JSON.stringify(json1)}});		
	res.end();
});




var server = app.listen(3001, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})