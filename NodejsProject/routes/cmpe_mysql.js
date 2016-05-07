var mysql  = require('mysql');

var connectionpool = mysql.createPool({
        host     : '52.37.104.158',
        user     : 'user',
        password : 'password',
        database : 'test',
        port	 : 3306
});


function listusers(req,res) {
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

}

function listusersID(req, res) {
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
}
function getpassword(req, res) {
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
}

function newuser(req, res) {
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
        		console.log(data);
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
}

function updatepass(req, res) {
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
}

function deleteUserlist(req, res) {
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
}


function newcards(req, res) {
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
}

function getcards(req, res) {
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
}


exports.listusers=listusers;
exports.listusersID=listusersID;
exports.getpassword=getpassword;
exports.newuser=newuser;
exports.updatepass=updatepass;
exports.deleteUserlist=deleteUserlist;
exports.newcards=newcards;
exports.getcards=getcards;