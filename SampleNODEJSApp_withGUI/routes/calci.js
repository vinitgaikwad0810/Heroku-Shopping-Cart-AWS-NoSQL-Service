/**
 * 
 */
var ejs = require("ejs");


function add(req,res)
{
			ejs.renderFile('./views/calculator.ejs' , function(err,result){
				if(!err){
					res.end(result);
				}
				else{
					res.end('lalala');
				}
			});
}

exports.addition = function(req,res){
	
	
		var num1 , num2 ,num3 , operation;
		
		num1 = Number(req.param("num1"));
		num2 = Number(req.param("num2"));
		operation = req.param("operation");
		
		console.log(num1);
		console.log(num2);
		console.log(operation);
			
		if(operation=="Addition"){
		
		num3 = num1 + num2;
		num3=num3.toString();
		console.log(num3);
		res.send(num3);
		} else if(operation=="Subtraction"){
			num3 = num1 - num2;
			num3=num3.toString();
			console.log(num3);
			res.send(num3);
		}else if(operation=="Multiplication"){
			num3 = num1 * num2;
			num3=num3.toString();
			console.log(num3);
			res.send(num3);
		}else if(operation=="Division"){
			if(num2 == 0){
				num3 = "Division by zero is wrong operation!!!"
				num3=num3.toString();
				console.log(num3);
				res.send(num3);
			}else if (num1 == 0){
				num3 = "Infinity";
				num3=num3.toString();
				console.log(num3);
				res.send(num3);
			}else{
				num3 = num1 / num2;
				num3=num3.toString();
				console.log(num3);
				res.send(num3);
			}
		}
		else{
			num3 = "Choose a Operation";
			num3=num3.toString();
			console.log(num3);
			res.send(num3);
		}
    }
	





exports.add=add;