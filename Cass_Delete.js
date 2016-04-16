var cassandra = require('cassandra-driver');
var async = require('async');
var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'db275'});
function select(callback) {
       client.execute("DELETE FROM test WHERE id = 2", function () {
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