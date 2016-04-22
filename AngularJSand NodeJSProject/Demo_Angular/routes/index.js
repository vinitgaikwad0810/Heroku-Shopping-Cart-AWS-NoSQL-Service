
/*
 * GET home page.
 */
var ejs = require("ejs");
exports.index = function add(req,res)
{
	ejs.renderFile('./views/demo_ang.ejs' , function(err,result){
		if(!err){
			res.end(result);
		}
		else{
			res.end('lalala');
		}
	});
}

	
 