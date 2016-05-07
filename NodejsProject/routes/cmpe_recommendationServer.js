//Let’s load the request module
var request = require("request");



var map = {};
map[1] = "16";
map[2] = "17";
map[3] = "18";

//Define your host and port. This is where your database is running. Here it’s on localhost.
var host = '52.39.77.65',
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


	var getUrl = "http://"+host+":"+port+"/db/data/node/"+nodeId+"/relationships/out";
	console.log(getUrl);
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
     		  getProductNoFromNeo4jServer(parsed[i].end,parsed.length,callback)	
			}
			
				
	      })
	  })

}



function getProductNoFromNeo4jServer(url,count,callback){

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
	      	product_id = parsed.data.product_id;
	      	console.log("productNo is" + product_id)
	      	callback(null,product_id,count);
	     
	      		      })
	  })
	
}

function convertHTTPResponseToJSON(body){

console.log(body);
var parsed = JSON.parse(body);
console.log("RELATIONSHIP FOUND :"+parsed[0].properties);
}


function getRecommendations(req, res) {
var jsonArray = {}
var index=0;
var nodeId = req.params.product_id-1;
console.log("nodeId" + nodeId)
var recommendations= runGetAllOutgoingRelationships(nodeId.toString(),function (err, recommendations,count) {
    if (err) {
      console.log(err);
    } else {
   		
      //console.log(recommendations);
      jsonArray[index++] = recommendations;
      if(index === count){
      	res.end(JSON.stringify(jsonArray));
      }

    }

  });

}



exports.getRecommendations = getRecommendations;
/*

app.get('/getRecommendations/:product_id', function (req, res) {
var jsonArray = {}
var index=0;
var nodeId = req.params.product_id-1;
console.log("nodeId" + nodeId)
var recommendations= runGetAllOutgoingRelationships(nodeId.toString(),function (err, recommendations,count) {
    if (err) {
      console.log(err);
    } else {
   		
      //console.log(recommendations);
      jsonArray[index++] = recommendations;
      if(index === count){
      	res.end(JSON.stringify(jsonArray));
      }

    }

  });

});
*/
/*

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})*/