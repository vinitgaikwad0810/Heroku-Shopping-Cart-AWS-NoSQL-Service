var log4js = require('log4js');
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

var logger = log4js.getLogger('syslog');

logger.trace('a trace message');
