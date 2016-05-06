# log4js-appender-cassandra

This is a cassandra appender for log4js. 

## Configuration
    "appender": {
      "type":     "log4js-appender-cassandra",
      "nodes":    ["cql"],
      "username": "cassandra",
      "password": "cassandra",
      "keyspace": "vesta",
      "table":    "system_logs"
    }
Options:

* `nodes`: array of nodes in cluster cassandra can try to use / default: `['localhost']`
* `username`: cassandra username / default: `cassandra`
* `password`: cassandra password / default: `cassandra`
* `keyspace`: keyspace to store logs / default: `log4js`
* `table`: tables to store logs / default: `log4js`

## Example
    var log4js = require('log4js');
    log4js.configure({
      appenders: [ 
        { 
          type:     'log4js-appender-cassandra',
          nodes:    ['cql'],
          username: 'cassandra',
          password: 'cassandra',
          keyspace: 'vesta',
          table:    'system_logs'
          }
        ]
    });
   
    var logger = log4js.getLogger('syslog');
    
    logger.trace('a trace message');
    logger.debug('a debug message');
    logger.info('an info message');
    logger.warn('a warning message');
    logger.error('an error message');
    logger.fatal('a fatal message');
