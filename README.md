# Cloud Scaled Shopping Cart Service

We were assigned to come up with an architecture for a scalable shopping cart service. One that could sustain massive HTTP load. 

### Here are main components of the project ->

#### Front End Web Server

Single Page Architecture 

![alt text](https://github.com/vinitgaikwad0810/Shopping-Cart-Service/blob/master/Web%20Front%20End/281%20architecture.png "Logo Title Text 1")

Front End Web Server is deployed on Heroku. 


### API Middleware. 

Middleware API's handle 

1. Shopping Cart Sessions -> AWS elasticache is used to deploy Redis cluster. We could have multiple Front-end web servers (scaling). Redis will maintain items added in shopping cart. 
2. Recommendation Server -> We had a rigid hardcoded Node-Label-Properties model in Neo4J. The purpose of this project is to practice scaling and availability leveraging cloud services. 
3. Product Catalog -> Mongo DB cluster deployed on AWS EC2.
4. Financial Information -> MySQL Database
5. Cassandra -> Highly available Cassandra cluster for storing User logs.



![alt text](https://github.com/vinitgaikwad0810/Shopping-Cart-Service/blob/master/Web%20Front%20End/Overall%20archi.png"Logo Title Text 1")


