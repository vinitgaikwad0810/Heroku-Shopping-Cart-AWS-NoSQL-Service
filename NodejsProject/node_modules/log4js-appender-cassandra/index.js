var cassandra = require('cassandra-driver'),
    uuid      = require('uuid');
consoleLog    = console.log;

function cassandraAppender(config) {
  var nodes    = config.nodes || ['localhost'],
      username = config.username || 'cassandra',
      password = config.password || 'cassandra',
      keyspace = config.keyspace || 'log4js',
      table    = config.table || 'log4js';

  var authProvider = new cassandra.auth.PlainTextAuthProvider(username, password);
  var connection   = new cassandra.Client({contactPoints: nodes, authProvider: authProvider});

  var connect = function (err, result) {
    if (err) {
      consoleLog(err);
    }
    else {
      var create_cql = "CREATE KEYSPACE IF NOT EXISTS " + keyspace + " WITH replication = {'class' : 'SimpleStrategy', 'replication_factor' : 1};";
      connection.execute(create_cql, create_keyspace);
    }
  };

  var create_keyspace = function (err, result) {
    if (err) {
      consoleLog(err);
    }
    else {
      var use_cql = "USE " + keyspace + ";";
      connection.execute(use_cql, use_keyspace);
    }
  };

  var use_keyspace = function (err, result) {
    if (err) {
      consoleLog(err);
    }
    else {
      var create_cql = "CREATE TABLE IF NOT EXISTS " + keyspace + "." + table + " (" +
        "  id timeuuid," +
        "  timestamp timestamp," +
        "  level varchar," +
        "  category varchar," +
        "  data text," +
        "  PRIMARY KEY (id, category, level, timestamp)" +
        ") WITH CLUSTERING ORDER BY ( category ASC, level ASC, timestamp DESC )" +
        "AND comment = 'log4js table';";
      connection.execute(create_cql, create_table);

    }
  };

  var create_table = function (err, result) {
    if (err) {
      consoleLog(err);
    }
  };

  connection.connect(connect);

  return function (loggingEvent) {
    var the_uuid = uuid.v1({
      msecs: loggingEvent.startTime.valueOf()
    });

    var insert_cql    = "INSERT INTO " + keyspace + "." + table + " ( id, timestamp, category, level, data)" +
      " VALUES ( ?, ?, ?, ?, ?);";
    var insert_params = [the_uuid, loggingEvent.startTime.valueOf(), loggingEvent.categoryName,
      loggingEvent.level.toString(), JSON.stringify(loggingEvent.data[0])];

    connection.execute(insert_cql, insert_params, {prepare: true}, function (err) {
      if (err) {
        consoleLog(err);
      }
    });
  };
}


function configure(config) {
  return cassandraAppender(config);
}

exports.appender  = cassandraAppender;
exports.configure = configure;