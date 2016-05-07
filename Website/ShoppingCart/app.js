
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , index = require('./routes/index')
  , path = require('path')
  , login = require('./routes/login')
  , register = require('./routes/register');
  var productsrender = require('./routes/productrendering');
  
var app = express();
var bodyParser = require('body-parser');
var session = require('client-sessions');
// all environments

app.use(session({   
	  
	cookieName: 'session',    
	secret: 'shopping_cart',    
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,  }));


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/index',index.index);
app.get('/account',index.account);
app.get('/contact',index.contact);
app.get('/checkout',index.checkout);
app.get('/products',index.products);
app.get('/productsNew',index.productsNew);
app.get('/MenProducts',index.MenProducts);
app.get('/TeesProducts',index.TeesProducts);
app.get('/womenproducts',index.womenproducts);
app.get('/kidproducts',index.kidproducts);
app.get('/register',index.register);
app.get('/single',index.single);
app.get('/typography',index.typography);
app.post('/renderMenProducts',productsrender.renderMenProducts);
app.get('/getMenProductPage',productsrender.getMenProductPage);
app.post('/registerUser');
app.post('/signup', login.signup);
app.post('/login',login.login);
app.get('/getData',login.getData);
app.get('/getData1',login.getData1);
app.get('/logout',login.logout);
app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

app.post('/register',register.register);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
