var express = require('express');
var cassandra = require('cassandra-driver');
var async = require('async');
var router = express.Router();


function helloWorld() {
	console.log("Hello World");
}
module.exports = router;
exports.myFunction = helloWorld;