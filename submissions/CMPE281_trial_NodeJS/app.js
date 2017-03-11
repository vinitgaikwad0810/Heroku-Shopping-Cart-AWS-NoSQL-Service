
/**
 * Module dependencies.
 */




var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , order=require('./routes/order')
  , session = require('client-sessions');

var app = express();

//configure the sessions with our application
app.use(session({   
	  
	cookieName: 'session',    
	secret: 'cmpe273_test_string',    
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,  }));

// all environments
app.set('port', process.env.PORT || 4100);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));




// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/addToCart', order.addToCart);
app.get('/clearCart', order.clearCart);
app.get('/redirectToHomepage',order.redirectToHomepage);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
