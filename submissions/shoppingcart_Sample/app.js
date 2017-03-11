
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , cart = require('./routes/cart')
  , http = require('http')
  , path = require('path')
  , session = require('client-sessions');

var app = express();

app.configure(function(){
	app.use(session({   
		  
		cookieName: 'session',    
		secret: 'cmpe273_test_string',    
		duration: 30 * 60 * 1000,    
		activeDuration: 5 * 60 * 1000,  }));
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/addToCart', cart.addToCart);
app.post('/addProduct', cart.addProduct);
app.get('/getCartProducts', cart.getCartProducts);
app.post('/deleteProduct', cart.deleteProduct);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
