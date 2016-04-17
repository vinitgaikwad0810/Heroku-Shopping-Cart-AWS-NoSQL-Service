# Neo4j -> Setup of a local instance of neo4j [DATE : Friday April 16, 2016]
1. Open up your terminal/shell.
2. Extract the contents of the archive, using:
tar -xf <filecode>.
For example,
tar -xf neo4j-enterprise-2.3.1-unix.tar.gz 
the top level directory is referred to as NEO4J_HOME
Run Neo4j using,
$NEO4J_HOME/bin/neo4j console
Instead of ‘neo4j console’, you can use neo4j start to start the server process in the background.
Visit http://localhost:7474 in your web browser.
Change the password for the ‘neo4j’ account.

After setting up the neo4j REST server, I started to think about how our cloud-scaled store front would look like when it comes to the software-architecture. Professor had suggested that we must follow approaches discussed in 'The Practice of Cloud Administration' book from the curiculum. Hence, We decided to go with the most optimal of architectures, that is, four-tier web architecture. Architecure had an elastic load balancer open to the public with a PublicDNS of course and different front-end-server and app-server at the back.

So I am supposed to build a recommendation engine to support my front-end servers, I believe 'making it RESTful' would be a good option. So I decided to delve into the nodejs, express and building REST endpoints. I came across this nice tutorial on how to use express to for routing HTTP requests coming at your REST endpoint and how to write individual handlers for each.









# Neo4j -> Recommendation Engine for CMPE281 Shopping Cart Service [DATE : Friday April 9, 2016]

My focus area is designing a recommender module which would pops out three or four products that current user is likely to buy. I came across this particular tutorial on the web  'http://neo4j.com/developer/guide-build-a-recommendation-engine/'. It nicely explains how 'neo4j' and it's property graph model helps in floating a quick recommendation engine, which will be able to suggest a user the movies fancied by his or her peers. Our shopping cart service will probably have some core products in the mongo-supported product catalog. A proposed recommendation engine, supported by a graph database like neo4j supports acquiring user surfing data, buidling an in-memory graph. You can query the same graph by writing in something called 'cypher query language'. 

A query to find actors acted in some movies started by 'T' is  

MATCH (actor:Person)-[:ACTED_IN]->(movie:Movie) 
WHERE movie.title =~ "T.*" 
RETURN movie.title as title, collect(actor.name) as cast 
ORDER BY title ASC LIMIT 10; 

We are used to traditional SQL-like query language. However, If I am to use Neo4j for designing something so complex like a recommendation engine, I might as well get familiar with the schema and query language. I believe drawing comparisions between RDBMS and neo4j would be a good start. You can check the following link 
http://neo4j.com/developer/guide-sql-to-cypher/ 
I think, scrapping through the query language gave me an indication of power of neo4j and I do believe I can now envision a recommendation engine for our CMPE 281 Shopping cart service. I tried sample nodejs code for building an engine that recommends friends by finding friends of friends. Please check the following js file. 

recommendationEngineFriendsOfFriends.js 
   




   
   
#Author
#Vinit Anil Gaikwad
#(SJSU ID 010739443)




[![Stories in Ready](https://badge.waffle.io/jagrutipatil/Heroku-Shopping-Cart-AWS-NoSQL-Service.png?label=ready&title=Ready)](http://waffle.io/jagrutipatil/Heroku-Shopping-Cart-AWS-NoSQL-Service)
