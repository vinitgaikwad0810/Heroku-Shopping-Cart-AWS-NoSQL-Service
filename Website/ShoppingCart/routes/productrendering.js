/**9
 * New node file
 */
var ejs = require("ejs");
var session=require('client-sessions');
var request = require('sync-request');
var https = require("https");
var http = require("http");


exports.getProductsMenTees = function(req, res) {
	var email = req.session.email;	
	var str='http://team4praj-env.us-west-2.elasticbeanstalk.com/getProducts/MEN/Tees';
	var httpcall = request('GET', str, {
		 'headers': {
			    'user-agent': 'example-user-agent'
			  }
	});
			
	console.log(httpcall.getBody('utf8'));
	res.send(httpcall.getBody('utf8'));
}


exports.renderMenTeesPage=function(req,res){
	ejs.renderFile("./views/TeesProducts.ejs", function(err, result) {
		if (!err) {			
			res.end(result);
		}
	});
};

