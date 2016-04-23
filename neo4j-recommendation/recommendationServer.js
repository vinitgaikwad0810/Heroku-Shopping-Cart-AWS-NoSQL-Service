//Let’s load the request module
var request = require("request");
var http = require('http');

var map = {};
map[1] = "16";
map[2] = "17";
map[3] = "18";

//Define your host and port. This is where your database is running. Here it’s on localhost.
var host = 'localhost',
  port = 7474;

//This is the url where we will POST our data to fire the cypher query. This is specified in Neo4j docs.
var httpUrlForTransaction = 'http://' + host + ':' + port + '/db/data/transaction/commit';
var httpUrlForRead = 'http://' + host + ':' + port + '/db/data/node/';
//Let’s define a function which fires the cypher query.
function runCypherQuery(query, params, callback) {
  request.post({
      uri: httpUrlForTransaction,
      json: {statements: [{statement: query, parameters: params}]}
    },
    function (err, res, body) {
      callback(err, body);
    })
}

function runGetAllOutgoingRelationships(nodeId,callback){

	var getUrl = "http://localhost:7474/db/data/node/"+nodeId+"/relationships/out";
	/*
	console.log(getUrl)
	
	http.get(getUrl,function callback(response) {
   		console.log(response) 
   		  response.setEncoding('utf8');
     //console.log(response.headers['content-type']) 
      response.on('data', function(data) {
        totalString += data.toString();
    })
     response.on('end',function(){
     	console.log(totalString)

     	var parsed = JSON.parse(totalString);
		console.log("RELATIONSHIP FOUND :"+parsed.type);
		
     })
  })*/
/*
var totalString = '';
request(getUrl, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage. 
	convertHTTPResponseToJSON(body);
  }
  else {
    console.log("Error "+response.statusCode)
  }
})*/

request.get(getUrl)
.on('response',function(response) {
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
    var body = '';
      response.on('data', function (chunk) {
     body += chunk;
  })
      response.on('end', function (){
      	convertHTTPResponseToJSON(body);
      })
  })


}

function convertHTTPResponseToJSON(body){

console.log(body);
var parsed = JSON.parse(body);
console.log("RELATIONSHIP FOUND :"+parsed[0].properties);
}

/**
 * Let’s fire some queries as shown below.
 * */

 /*
runCypherQuery(
  'CREATE (somebody:Person { name: {name}, from: {company}, age: {age} }) RETURN somebody', {
    name: 'Ghuffran',
    company: 'Modulus',
    age: 44
  }, function (err, resp) {
    if (err) {
      console.log(err);
    } else {
      console.log(resp);
    }
  }
);*/

runGetAllOutgoingRelationships(map[1],function (err, resp) {
    if (err) {
      console.log(err);
    } else {
      console.log(resp);
    }
  });

