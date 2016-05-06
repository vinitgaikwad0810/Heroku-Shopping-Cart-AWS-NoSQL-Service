/**9
 * New node file
 */
var ejs = require("ejs");
var https = require("https");
var http = require("http");
var request = require('sync-request');




exports.renderMenProducts=function(req,res){
		//console.log(res);
		var productSubCategory = req.param("Tees");
		console.log("Its Coming here");
		var str='http://team4praj-env.us-west-2.elasticbeanstalk.com/getProducts/MEN/'+productSubCategory;
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


