//Let’s load the request module
var request = require("request");
var http = require('http');
var express = require('express');
var app = express();

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

function returnValue(err, tobeReturned){
	
    if (err) {
      console.log(err);
    } 
   
     return tobeReturned;
}

function runGetAllOutgoingRelationships(nodeId,callback){

	var getUrl = "http://localhost:7474/db/data/node/"+nodeId+"/relationships/out";

	var recommendations = {}
	request.get(getUrl)
	.on('response',function(response) {
	    console.log(response.statusCode) // 200
	    console.log(response.headers['content-type']) // 'image/png'
	    var body = '';
	      response.on('data', function (chunk) {
	     body += chunk;
	  })
	      response.on('end', function (){
	      	var parsed = JSON.parse(body);
	      	
	      	for(var i=0; i< parsed.length; i++)
			{
			//console.log(getProductNoFromNeo4jServer(parsed[i].end,returnValue))
     		  getProductNoFromNeo4jServer(parsed[i].end,callback)	
			}
			
				
	      })
	  })

}



function getProductNoFromNeo4jServer(url,callback){

console.log(url);
var productNo='';	

	request.get(url)
	.on('response',function(response) {
	  //  console.log(response.statusCode) // 200
	   // console.log(response.headers['content-type']) // 'image/png'
	    var body = '';
	      response.on('data', function (chunk) {
	     body += chunk;
	  })
	      response.on('end', function (){

	      	var parsed = JSON.parse(body);
	      	productNo = parsed.data.productNo;
	      	console.log("productNo is" + productNo)
	      	callback(null,productNo);
	     
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

var recommendations= runGetAllOutgoingRelationships(map[1],function (err, recommendations) {
    if (err) {
      console.log(err);
    } else {
   		
      console.log(recommendations);

    }
  });



