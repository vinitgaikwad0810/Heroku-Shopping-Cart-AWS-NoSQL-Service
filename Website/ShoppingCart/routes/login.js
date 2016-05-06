/**
 * New node file
 */

var session=require('client-sessions');
var request = require('sync-request');
var https = require("https");
var http = require("http");

exports.signup = function(req,res){
	
	var fname=req.param("fname");
	var lname=req.param("lname");
	var email=req.param("email");
	var password=req.param("password");
	var mobileno=req.param("mobileno");
	

	console.log("Username: " + email);
	console.log("Password: " + password);
	
	var httpcall = request('POST', 'http://52.37.104.158:8888/newuser', {
		  json: { fname:fname,
				  lname:lname,
			  	  uname: email,
			  	  password:password,
			  	  mobileno:mobileno
			  }
		});
		
	console.log("Sync call in Signup");
	console.log(httpcall.getBody('utf8'));		
	//var userId1=req.session.email + "";
	var json_responses = {"Status" : "success","JsonData" : httpcall.getBody('utf8')};
	res.send(json_responses);
		 
}

exports.login = function(req,res){
	
	var email=req.param("email");
	var password=req.param("password");
	
	

	console.log("Username: " + email);
	console.log("Password: " + password);
	
	var httpcall = request('POST', 'http://52.37.104.158:8888/getpassword', {
		  json: { uname: email,
			  	  password:password,
			  	 // userId:userId1
			  }
		});
		
	console.log("Sync call in getData1");
	console.log(httpcall.getBody('utf8'));		
	//var userId1=req.session.email + "";
	var json_responses = {"Status" : "success","JsonData" : httpcall.getBody('utf8')};
	res.send(json_responses);
		 
}


exports.getData=function(req,res){
	res.render("products");
}

exports.getData1=function(req,res)
{
	var email=req.param("email");
		var str='http://52.37.104.158:8888/getpassword'+req.session.userId;
		console.log("api call is......."+str);
		var httpcall = request('GET', str, {
		  'headers': {
		    'user-agent': 'example-user-agent'
		  }
		});
		console.log("Sync call");
		console.log(httpcall.getBody('utf8'));
		var json_responses = {"Status" : "success","JsonData" : httpcall.getBody('utf8')};
		
		 res.send(json_responses);
}