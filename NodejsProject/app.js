var express = require('express');
var routes = require('./routes');
var redis = require('./routes/cmpe_redis');
var mysql = require('./routes/cmpe_mysql');
var cassandra =require('./routes/cmpe_cassandra');
var mongo = require('./routes/cmpe_mongodb');

var index = require('./routes/index');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

// all environments
app.set('port', process.env.PORT || 8888);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header('Access-Control-Allow-Methods', "*");
	  res.header('Access-Control-Allow-Headers', "Content-Type");
	  //res.header("Access-Control-Allow-Headers", "*");
	  next();
	});


if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.index);
app.post('/addToCart', redis.addProductToCard);
app.post('/getShoppingCart', redis.getShoppingCart);
app.post('/deleteFromShoppingCart', redis.deleteFromShoppingCart);

app.post('/newuser', mysql.newuser);
app.post('/listusers', mysql.listusers);
app.post('/listusers/:id', mysql.listusersID);
app.post('/getpassword', mysql.getpassword);

app.post('/updatepass', mysql.updatepass);
app.post('/deluserlist/:id', mysql.deleteUserlist);
app.get('/getProducts/:productCatagory/:productSubCatagory', mongo.getProductCatagory);


app.post('/log',cassandra.log);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
