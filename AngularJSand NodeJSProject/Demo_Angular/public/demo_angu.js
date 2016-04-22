var app = angular.module('ToDo', []);
    app.controller('todoController',['$scope' , function($scope){
    	$scope.todos = [{'title' : 'Preeti Patil' , 'done' :false}, {'title' : 'Sharad' , 'done' :false}];
    	
    	$scope.addname = function(index){
    		$scope.todos.push({'title' : $scope.newName , 'done':false});
    		$scope.newName = " ";
    	}
//    	$scope.lastname = function(){
//    		$scope.todos = $scope.todos.filter(function(item)){
//    			return !item.done;
//    		}
//    	}
    }]);