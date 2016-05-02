
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.account = function(req, res){
	 res.render('account', { title: 'Express' });
};