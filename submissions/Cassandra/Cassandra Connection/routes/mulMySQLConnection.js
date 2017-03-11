var express = require('express'),
    app     = express(),
    mysql   = require('mysql'),
    connectionpool = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'test'
    });
var bodyParser = require('body-parser');

//configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
 extended: true
 
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header('Access-Control-Allow-Methods', "*");
	  res.header('Access-Control-Allow-Headers', "Content-Type");
	  //res.header("Access-Control-Allow-Headers", "*");
	  next();
	});
// get all users
app.get('/listusers', function(req,res){
	console.log("\n List all users request");
    connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query('SELECT * from login', function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send({
                    result: 'success',
                    err:    '',
                    //fields: fields,
                    json:   rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
});

// get by id
app.get('/listusers/:id', function(req,res){
	console.log("\n Listing user by id "+req.params.id);
	connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query('SELECT * from login WHERE id = '+connection.escape(req.params.id), function(err, rows) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }else {
                    if (rows.length === 0){
                        res.statusCode = 204;
                    } else {
                        res.send({
                            result: 'success',
                            err:    '',
                            json:   rows[0],
                            length: 1
                        });
                    }
                    connection.release();
                }
            });
        }
    });
});

// get password
app.post('/getpassword', function(req,res){
	console.log("\n Getting Password");
	connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
        	var data = req.body;
                connection.query('Select password FROM login WHERE username =\"' + data.uname + '\"', function(err, result) {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    } else {
                    	if(result.length>0){
	                    	if(result[0].password===data.password){
	                        	res.send({
	                            	result: 'success',
	                            	uname: data.uname
	                        	});
	                    	}else{
	                    		res.send({
	                            	result: 'error'
	                        	});
	                    	}
	                    }
                    	else{
                            res.send({
                                result: 'error',
                            });
                    	}
                    }
                    connection.release();
                });
            }
	});
});




app.post('/getcards', function(req, res) {
	connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
        	var data = req.body;
                connection.query('Select id FROM login WHERE username =\"' + data.uname + '\"', function(err, result) {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    } else {
                    	connection.query('Select cardnumber,cardtype FROM carddetails WHERE uid =\"' + result[0].id + '\"', function(err, rows) {
                            if (err) {
                                console.error(err);
                                res.statusCode = 500;
                                res.send({
                                    result: 'error',
                                    err:    err.code
                                });
                            } else {
                            	if(rows.length>0){
        	                    	var count=0;
        	                    	var cards={};
        	                    	var type={};
                            		while(count<rows.length){
                            			cards[count] = rows[count].cardnumber;
                            			type[count] = rows[count].cardtype;
                            			count++;
                            		}
                            		
                            		var jsonArray = {};
                            		jsonArray["result"] = "success";
                            		jsonArray["card"] =cards;
                            		jsonArray["type"] =type;
                            		jsonArray["length"]=rows.length;
    	                        	res.send(JSON.stringify(jsonArray));
    	                    	
        	                    }
                            	else{
                                    res.send({
                                        result: 'error',
                                    });
                            	}
                            }
                            connection.release();              
                    });
       }
                
});
        }
	});
});


app.post('/newcards', function(req, res) {
	connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
        	var data = req.body;
                connection.query('Select id FROM login WHERE username =\"' + data.uname + '\"', function(err, output) {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    } else {
                    	if(output.length>0){
                    	connection.query('INSERT INTO carddetails(cardnumber, cardtype, uid) VALUES (' + data.cardnumber + ',\'' + data.cardtype + '\',' + output[0].id + ');', function(err, rows) {
                            if (err) {
                                console.error(err);
                                res.statusCode = 500;
                                res.send({
                                    result: 'error',
                                    err:    err.code
                                });
                            } else {
                                 res.send({
                                     result: 'success',
                                     err: ''
                                 });
                            }
                            connection.release();
                    		});
                    	}
                    	else{
                    		res.send({
                                result: 'error',
                                err:    ''
                            });
                    	}
       }
                
});
        }
	});
});



app.post('/newuser', function(req,res){
	console.log("\n New User entry");
	connectionpool.getConnection(function(err, connection) {
		if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
        	var data = req.body;
                connection.query('INSERT INTO login (fname, lname, username, password, mobilno) VALUES (\"' + data.fname + '\", \"' + data.lname + '\",\"' + data.uname + '\",\"' + data.password + '\",\"' + data.mobileno + '\")', function(err, result) {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    } else {
                        res.send({
                            result: 'success',
                            err:    '',
                        });
                    }
                    connection.release();
                });
            }
	});
                
});
app.put('/updatepass', function(req,res){
	console.log("\n Updating Password");
	connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
        	var data = req.body;
                connection.query('UPDATE login SET password= \"'+ data.password +'\" WHERE username =\"' + data.uname + '\"', function(err, result) {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    } else {
                        res.send({
                            result: 'success',
                            err:    '',
                        });
                    }
                    connection.release();
                });
            }
	});
});

app.put('/updatemobile', function(req,res){
	console.log("\nUpdate mobile number");
	connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
        	var data = req.body;
                connection.query('UPDATE login SET mobilno= \"'+ data.mobileno +'\" WHERE username =\"' + data.uname + '\"', function(err, result) {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    } else {
                        res.send({
                            result: 'success',
                            err:    '',
                        });
                    }
                    connection.release();
                });
            }
	});
});

app.put('/updatename', function(req,res){
	console.log("\n Updating Name");
	connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
        	var data = req.body;
                connection.query('UPDATE login SET fname= \"'+ data.fname+'\" , lname=\"'+ data.lname +'\" WHERE username =\"' + data.uname + '\"', function(err, result) {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    } else {
                        res.send({
                            result: 'success',
                            err:    '',
                        });
                    }
                    connection.release();
                });
            }
	});
});

app.delete('/userlist/:id', function(req,res){
	connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query('DELETE FROM login WHERE id = '+connection.escape(req.params.id), function(err, rows) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }else {
                    if (rows.length === 0){
                        res.statusCode = 204;
                    } else {
                        res.send({
                            result: 'success',
                            err:    '',
                            length: 1
                        });
                    }
                    connection.release();
                }
            });
        }
    });
});
app.listen(8888);
console.log('Rest Demo Listening on port 8888');