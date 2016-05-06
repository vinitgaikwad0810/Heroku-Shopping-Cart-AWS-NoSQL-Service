/**
 * New node file
 */
var ejs = require("ejs");
var session=require('client-sessions');
var request = require('sync-request');
var https = require("https");
var http = require("http");

//REGISTER A USER
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
	var json_responses = {"Status" : "success","JsonData" : httpcall.getBody('utf8')};
	res.send(json_responses);
 
};

// LOGIN FOR A USER
exports.login = function(req,res){
	
	var email=req.param("email");
	var password=req.param("password");
	
	console.log("Username: " + email);
	console.log("Password: " + password);
	if(req.session.email){
		 ejs.renderFile('./views/products.ejs', {
            email: req.session.email,
            data : email,
        }, function(err, result) {
            // render on success
            if (!err) {
           	  res.end(result);
            }
            // render or error
            else {
                res.end('An Error Occurred !!');
                console.log(err);
            }
        });
	}else{
		var httpcall = request('POST', 'http://52.37.104.158:8888/getpassword', {
			  json: { uname: email,
				  	  password:password,
				  }
			});
		
		console.log("Sync call in Login");
		console.log(httpcall.getBody('utf8'));		
		req.session.email = email;
		var json_responses = {"Status" : "success","JsonData" : httpcall.getBody('utf8')};
		res.send(json_responses);
	}
	
};

// FETCH DATA AFTER LOGIN
exports.getData=function(req,res){
	var email = req.session.email;
	ejs.renderFile('./views/products.ejs', {
        email: req.session.email,
        data : email,
    }, function(err, result) {
        // render on success
    	
        if (!err) {
       	 
            res.end(result);
        }
        // render or error
        else {
            res.end('Error occurred while logging in !');
            console.log(err);
        }
    });
};


//LOGOUT A USER
exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
    ejs.renderFile('./views/index.ejs', function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
};

// GET METHOD
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