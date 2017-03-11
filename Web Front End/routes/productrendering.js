/**9
 * New node file
 */
var ejs = require("ejs");
var session=require('client-sessions');
var request = require('sync-request');
var https = require("https");
var http = require("http");

exports.renderMenProducts=function(req,res){
		//console.log(res);
		var productSubCategory = req.param("Tees");
		console.log("Its Coming here");
		var str='http://team4praj-env.us-west-2.elasticbeanstalk.com/getProducts/MEN/Tees';
		console.log("api call is......."+str);
		var httpcall = request('GET', str, {
			 'headers': {
				    'user-agent': 'example-user-agent'
				  }
		});
		console.log("Sync call");
		console.log(httpcall.getBody('utf8'));
		var json_responses = {"Status" : "success","JsonData" : httpcall.getBody('utf8')};
		//res.send(json_responses);
		var abc = JSON.parse(json_responses.JsonData);
		console.log(abc[0].productName);
		
};


//GET TEES FOR MEN
exports.getMenProductPage=function(req,res){
	var email = req.session.email;
	ejs.renderFile('./views/TeesProducts.ejs', {data : res }, function(err, result) {
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

