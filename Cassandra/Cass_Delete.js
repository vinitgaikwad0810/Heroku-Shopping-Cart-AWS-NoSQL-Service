var cassandra = require('cassandra-driver');
var async = require('async');
var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'db281'});
function select(callback) {
       client.execute("DELETE FROM test WHERE id = 2", function () {
           if (!err){
                   console.log("Error");
           	}
           else{
           	 console.log("Sucess");
           }
           }
           callback();
       });
   }
function funcSelect(){
	console.log("Delete Query");
}
select(funcSelect);
