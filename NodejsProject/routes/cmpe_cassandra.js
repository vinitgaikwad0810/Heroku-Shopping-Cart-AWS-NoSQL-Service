var log4js = require('log4js');
log4js.configure({
	  appenders: [ 
	    { 
	      type:     'log4js-appender-cassandra',
	      nodes:    ['52.24.140.37'],
	      username: 'root',
	      password: 'root',
	      keyspace: 'test',
	      table:    'system_logs'
	      }
	    ]
	});


function log(req,res){
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
 }

exports.log=log;