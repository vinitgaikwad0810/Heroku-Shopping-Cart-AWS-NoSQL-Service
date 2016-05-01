/**
 * New node file
 */
exports.addToCart = function(req, res){
	
	console.log(req.param("itemName"));
	console.log(req.param("itemPrice"));
	
	json_responses = {"itemName" : req.param("itemName"),"itemPrice" : req.param("itemPrice")};
	res.send(json_responses);
};

exports.addProduct = function(req, res){
		
	if (typeof req.session.items == 'undefined')
	{
		req.session.items = [];
		req.session.storeId = 0;
	}
	
	if (typeof req.session.total == 'undefined')
	{
		req.session.total = 0;
	}
	
	req.session.items.push({name : req.param("itemName"),price : req.param("itemPrice"),id : req.session.storeId});
	req.session.total = req.session.total + req.param("itemPrice");
	
	req.session.storeId = req.session.storeId + 1;
	
	var json_responses = {"items" : req.session.items,"total" : req.session.total};
	res.send(json_responses);
//	res.render("homepage",{username:""});

};

exports.getCartProducts = function(req, res){
		
//	req.session.destroy();
	
	if (typeof req.session.items == 'undefined')
	{
		req.session.items = [];
		req.session.storeId = 0;
	}	
	
	if (typeof req.session.total == 'undefined')
	{
		req.session.total = 0;
	}
	
	var json_responses = {"items" : req.session.items,"total" : req.session.total};
	res.send(json_responses);
//	res.render("homepage",{username:""});

};

exports.deleteProduct = function(req, res){
	
	var itemId = req.param("itemId");
	var counter = 0;
	
	for (var i = 0; i < req.session.items.length; i++)
	{
		if (req.session.items[i].id == itemId)
		{
			counter = i;
			break;
		}
	}
	
	req.session.total = req.session.total - req.session.items[counter].price;
	
	req.session.items.splice(counter,1);
	
	var json_responses = {"items" : req.session.items,"total" : req.session.total};
	res.send(json_responses);
//	res.render("homepage",{username:""});

};