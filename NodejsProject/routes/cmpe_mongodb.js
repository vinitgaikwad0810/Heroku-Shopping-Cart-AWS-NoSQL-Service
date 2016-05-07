var fs = require("fs");
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://52.39.77.65:27017/productcatalog';

var ObjectId = require('mongodb').ObjectID;

function getProductCatagory(req, res) {
	console.log(req.params.productCatagory);
	console.log(req.params.productSubCatagory);
	
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  findProducts(db,req.params.productCatagory,req.params.productSubCatagory,function(err,data) {
	      if(data!=null){
	      	console.log(data)
		   res.end(JSON.stringify((data),null,4));
	  }
	  });
	});
}

function getProductbyId(req,res) {


MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findProductById(db,req.params.product_id,function(err,data) {
      if(data!=null){
        console.log(data)
     res.end(JSON.stringify((data),null,4));
  }
  });
});
}

var findProductById = function(db,product_id,callback){


   var cursor =db.collection('productCollection').find( {"product_id": Number(product_id)});
   var doc_total = {};
   var index = 0;
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      console.log("Doc is "+doc)
      if (doc != null) {

        callback(null,doc);
      } else {
      
      }
   });
};



function findProducts(db, productCatagory, productSubCatagory, callback) {
	console.log ("productCatagory is "+productCatagory)
	console.log ("productSubCatagory" + productSubCatagory)
	var cursor =db.collection('productCollection').find( { "productCatagory": productCatagory ,"productSubCatagory": productSubCatagory});
	var doc_total = {};
	var index = 0;
	cursor.each(function(err, doc) {
      assert.equal(err, null);
      console.log("Doc is "+doc)
      if (doc != null) {

         doc_total[index++] = doc;
      } else {
     	callback(null,doc_total);
      }
   });
};	



exports.getProductCatagory = getProductCatagory;
exports.getProductbyId = getProductbyId;