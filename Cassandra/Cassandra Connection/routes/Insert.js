var cassandra = require('cassandra-driver');
var async = require('async');
var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'db281'});
function select(callback) {
       client.execute("INSERT INTO test (id,name) VALUES (1,'asdfgh')", function () {
           if (!err){
                   console.log("Error inserting values");
               }
	   else{
	         console.log("Values inserted successfully");
           }
           callback();
       });
   }
function funcSelect(){
	console.log("Insert Query");
}
select(funcSelect);