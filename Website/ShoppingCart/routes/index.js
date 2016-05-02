
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.account = function(req, res){
	 res.render('account', { title: 'Express' });
};
exports.contact = function(req, res){
	 res.render('contact', { title: 'Express' });
};
exports.register = function(req, res){
	 res.render('register', { title: 'Express' });
};
exports.checkout = function(req, res){
	 res.render('checkout', { title: 'Express' });
};
exports.products = function(req, res){
	 res.render('products', { title: 'Express' });
};
exports.single = function(req, res){
	 res.render('single', { title: 'Express' });
};
