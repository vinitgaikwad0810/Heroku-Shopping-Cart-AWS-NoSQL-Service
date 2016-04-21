
var cassandra = require('cassandra-driver');
var async = require('async');
var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'db281'});
function select(callback) {
       client.execute("SELECT name FROM test WHERE id = 2", function (err, result) {
           if (!err){
               if ( result.rows.length > 0 ) {
                   var row = result.rows[0];
                   console.log("id = %d, name = %d", row.id, row.name);
               } else {
                   console.log("No rows selected");
               }
           }
           callback();
       });
   }
function funcSelect(){
	console.log("Select Query");
}
select(funcSelect);