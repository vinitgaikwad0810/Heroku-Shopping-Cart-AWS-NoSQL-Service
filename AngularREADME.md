Learning AngularJS

Some References
http://www.w3schools.com/angular/
http://www.tutorialspoint.com/angularjs/

Pre-requisites for Angular JS: Knowledge of JavaScript, HTML, CSS
Angular JS is used along with bootstrap to build web applications.

In the example below, the link written in script tag is angular js file readily available from Google API. In order to use angular this link containing js file should be used.
In angular : <html> tag is accompanied by ng-app which marks the start of angular code with html.
Important tags in angular:
1. ng-app
2. ng-model
3. ng-controller(will be used later)
4. {{in order to print something}}


Example code:

<!doctype html>
<html ng-app>
   
   <head>
      <script src = "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular.min.js"></script>
   </head>
   
   <body>
      <div>
         <label>Angular JS Trial</label>
         <input type = "text" ng-model = "CMPE281" placeholder = "clod Computing">
         <hr />
         
         <h1>Hello {{Cloud 281}}!</h1>
      </div>
      
   </body>
</html>


