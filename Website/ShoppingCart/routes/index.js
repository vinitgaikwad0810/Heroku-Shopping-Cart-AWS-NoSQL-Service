
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
exports.productsNew = function(req, res){
	 res.render('productsNew', { title: 'Express' });
};
exports.MenProducts = function(req, res){
	 res.render('MenProducts', { title: 'Express' });
};
exports.womenproducts = function(req, res){
	 res.render('womenproducts', { title: 'Express' });
};
exports.kidproducts = function(req, res){
	 res.render('kidproducts', { title: 'Express' });
};
exports.single = function(req, res){
	 res.render('single', { title: 'Express' });
};
exports.typography = function(req, res){
	 res.render('typography', { title: 'Express' });
};
