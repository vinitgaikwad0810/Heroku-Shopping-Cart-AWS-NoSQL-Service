exports.addToCart = function(req,res)
{
	var selection=req.param("selection");
	console.log(selection);
	var obj="{\"item\":"+selection+"}";
	var obj1=JSON.parse(obj);
	/*console.log(obj1.item[1].cost);*/
	var json_responses;
	
	if(selection!==null)
	{


			//Assigning the session
			req.session.selection = obj1;
			console.log("Session initialized");
			console.log(req.session.selection);
			json_responses = {"statusCode" : 200};
			res.render("HomePage",{selection:obj1});
				
	
}
	else
	{
		json_responses = {"statusCode" : 401};
		res.send(json_responses);
	}
	
	
	
	
	
	
};


//Redirects to the homepage
exports.redirectToHomepage = function(req,res)
{
	//Checks before redirecting whether the session is valid

	console.log(req.session.username);
	if(req.session.username)
	{
		console.log("yes");
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		//res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homepage",{username:req.session.username});
	}
	else
	{
		res.redirect('/');
	}
	
	
	
	

};




//Logout the user - invalidate the session
exports.clearCart = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};
