var http=require("http");
var server = http.createServer(function(request, response){
	response.writeHead(200,{"Content-Type":"text/html"});
	response.end("Hi CMPE281");
}).listen(8888);