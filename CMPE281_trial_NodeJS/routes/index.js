
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Heroku Trial node JS' });
};