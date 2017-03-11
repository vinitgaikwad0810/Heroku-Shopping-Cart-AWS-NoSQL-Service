var ejs = require("ejs");
var mysql = require('./mysql');

//AFTER SIGN IN

function afterSignIn(req, res) {
    var emailid = req.param("email");
    console.log(emailid);
    var password = req.param("inputPassword");
    var loginUser, name;
    var json_responses;

    loginUser = "select * from signup where email ='" + emailid + "' and pass = '" + password + "'";
    //console.log(loginUser);
    name = "select firstname from signup where email='" + emailid + "'";
    //console.log(name);
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results.length > 0) {
                console.log("valid Login");
                req.session.emailid = emailid;
                console.log("Session initialized");
                json_responses = {
                    "statusCode": 200
                };
                console.log(json_responses);
                res.send(json_responses);

                } else {

                json_responses = {
                    "statusCode": 401
                };
                res.send(json_responses);
            }
        }
    }, loginUser);
};

//REDIRECTS TO HOMEPAGE

exports.redirectToHomepage = function(req, res) {
    //Checks before redirecting whether the session is valid
    if (req.session.emailid) {
        var loginUser = "select * from signup where email ='" + req.session.emailid + "'";
        mysql.fetchData(function(err, results) {
            if (err) {
                throw err;
            } else {
                if (results.length > 0) {
                    console.log("Valid Login");
                    ejs.renderFile('./views/SuccessLogin.ejs', {
                        emailid1: req.session.emailid,
                        data: results
                    }, function(err, result) {
                        // render on success
                        if (!err) {
                            res.end(result);
                        }
                        // render or error
                        else {
                            res.end('huh');
                            console.log(err);
                        }
                    });
                } else {


                    console.log("Invalid Login" + results1.length);
                    ejs.renderFile('./views/FailLogin.ejs', function(err, result) {
                        // render on success
                        if (!err) {
                            res.end(result);
                        }
                        // render or error
                        else {
                            res.end('Tikde nai... Ikde');
                            console.log(err);
                        }
                    });

                }
            }
        }, loginUser);




        //Set these headers to notify the browser not to maintain any cache for the page being loaded
        //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        //res.render("SuccessLogin",{emailid1 : req.session.emailid});
    } else {
        res.redirect('/');
    }
};








exports.afterSignIn = afterSignIn;
