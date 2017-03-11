var cassandra = require('cassandra-driver');
var async = require('async');
var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'db281'});
function select(callback) {
       client.execute("UPDATE test SET name = 'qwerty'WHERE id = 2", function () {
           if (!err){
                   console.log("UPDATE unsuccessful");
               }
	   else{
                   console.log("UPDATE successful");
               }
           }
           callback();
       });
   }
function funcSelect(){
	console.log("UPDATE Query");
}
select(funcSelect);