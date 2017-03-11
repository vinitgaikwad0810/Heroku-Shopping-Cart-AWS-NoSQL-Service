var mysql      = require('mysql');
var express = require('express');
var app = express();
var fs = require("fs");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'test'
});

connection.connect();

app.get('/listUsers', function (req, res) {
	connection.query('SELECT * from tutorials_tbl', function(err, rows) {
		  if (!err){
		    console.log('The solution is: ', rows);
		    res.status(200).end('retrieved');
		  }
		  else{
		    console.log('Error while performing Query.');
		    res.status(404).end('Error');
		  }
	});
});


var server = app.listen(8888, function () {

	  var host = server.address().address;
	  var port = server.address().port;

	  console.log("Example app listening at http://%s:%s", host, port);

	});
//connection.end();