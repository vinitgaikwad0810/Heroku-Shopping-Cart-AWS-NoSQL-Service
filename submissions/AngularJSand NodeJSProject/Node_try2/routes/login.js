/**
 * 
 */

var ejs = require("ejs");
exports.login = function(req,res)
{
	var username , password;
	username = req.param("username");
	password = req.param("password");
	
	console.log(username+ " " +password);
	if(username === "test1" && password === "test1")
		{
			ejs.renderFile("./views/Success.ejs");
		}
	else
		{
			res.render("error");
		}
};