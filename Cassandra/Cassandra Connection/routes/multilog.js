var log4js = require('log4js');
var express = require('express'),
app     = express();
var bodyParser = require('body-parser');
log4js.configure({
  appenders: [ 
    { 
      type:     'log4js-appender-cassandra',
      nodes:    ['localhost'],
      username: 'root',
      password: 'root',
      keyspace: 'test',
      table:    'system_logs'
      }
    ]
});

app.use(bodyParser.urlencoded({
	 extended: true
	 
	}));
	app.use(bodyParser.json());
	app.use(function(req, res, next) {
		  res.header("Access-Control-Allow-Origin", "*");
		  res.header('Access-Control-Allow-Methods', "*");
		  res.header('Access-Control-Allow-Headers', "Content-Type");
		  //res.header("Access-Control-Allow-Headers", "*");
		  next();
		});

var logger = log4js.getLogger('syslog');



app.post('/log', function(req,res){
	console.log(req);
	var data = req.body;
	if(data.level==="trace"){
		logger.trace(data.message);
		res.statusCode = 204;
		res.send({
            result: 'success',
        });
	}
	else if(data.level==="debug"){
		logger.debug(data.message);
		res.statusCode = 204;
		res.send({
            result: 'success',
        });
	}
	else if(data.level==="info"){
		logger.info(data.message);
		res.statusCode = 204;
		res.send({
            result: 'success',
        });
	}
	else if(data.level==="warn"){
		logger.warn(data.message);
		res.statusCode = 204;
		res.send({
            result: 'success',
        });
	}
	else if(data.level==="error"){
		logger.error(data.message);
		res.statusCode = 204;
		res.send({
            result: 'success',
        });
	}
	else if(data.level==="fatal"){
		logger.fatal(data.message);
		res.statusCode = 204;
		res.send({
            result: 'success',
        });
	}
	else{
		res.statusCode = 500;
		res.send({
            result: 'error',
        });
	}
 });

app.post('/userlog', function(req,res){
	var data = req.body;
	 var nodes=['localhost'],
     username = 'root',
     password = 'root',
     keyspace = config.keyspace || 'log4js',
     table    = config.table || 'log4js';
 });
app.listen(8888);
console.log('Cassandra Logger Listening on port 8888');