
/*
 * GET home page.
 */

exports.index = function(req, res){
	
	if(typeof req.session.items != 'undefined')
	{
		res.render('index', { title: 'Shopping Cart',items: req.session.items });
	}
	else
	{
		res.render('index', { title: 'Shopping Cart' });		
	}
  
};
