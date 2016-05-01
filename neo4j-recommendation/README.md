# Neo4j -> Product Catalog Decision                                   [DATE: Saturday April 30, 2016]

Now that I have my Neo4J recommemendation server up and running. It was time to work on a focus area which was not take by any member of the team. However, We still wanted to have that area. I am talking about Mongo powered catalog. We had team meeting yesterday about it. It was decided to have Product Schema in Mongo Server. Mongo Server would be part of the data base layer.

I started looking at the resources on the web. for the product catalog design. The schema must contain general product information. 


{
  sku: "00e8da9b",
  type: "Football Kit",
  title: "Man United Jersey",
  description: "by Sir Alex Ferguson",
  asin: "B0000A118M",

  shipping: {
    weight: 10,
    dimensions: {
      width: 50,
      height: 40,
      depth: 2
    },
  },

  pricing: {
    list: 125,
    retail: 110,
    savings: 10,
    pct_savings: 10
  },

  details: {
    title: "Manchester United is one of the largest club in the world",
    artist: "Sir Alex Ferguson",
   
        ...
    Related Products: [
      "Tottenham Jersey",
      "Leceister Jersey"
    ],
  },
}


The Schema has related products. We have Neo4J to dynamically find related products. So that will probably not be necessary. We have also given a thought about having 



# Neo4j -> Development, Coding and Testing Activity [DATE: Saturday April 23, 2016]

We have setup the local instance of Neo4j, graph database last time around. Architecture was decided to be REST. I believe my individual preparation for my part is going strong. It is time to interact with my fellow team members for the interfaces. Unmesh and Preeti are working on Heroku-Front End and Mongo product catalog. Questions needed to be answered,

What does Front-End Server need exactly along with 'ProductNo's for the recommendations rendering?

Does recommendation server needs to store information regarding the product?

Mongo DB instances are supposed to be holding the information about the products? If yes, is it feasible to go to Catalog Server everytime a new product has been recommended for rendering on the UI? Otherwise, we could have minimal information in Neo4J recommendation Server.

As of Now, I have decided to go with following Node model.

"...productCost	21
productNo	2
productName	Chelsea Jersey...

With this, I could implement server-side logic which can be extended to handle more fields (Or less If I have my way).

If someone buys a Chelsea jersey, we must recommended him Tottenham-related stuff. Two nodes are related by RECOMMENDS relationship. Following is the CREATE script for such relations.

MATCH (product_3:Product_3),(product_1:Product_1)
CREATE (product_3)-[like:RECOMMENDS ]->(product_1)
RETURN like

This would be the basis for further development. 


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

Please have a look at the 'restful' folder on git (https://github.com/cmpe281-team4/Heroku-Shopping-Cart-AWS-NoSQL-Service/tree/master/neo4j-recommendation/restful). I was able to build a quick REST endpoint in matter of minutes. 

Next week, I plan to make major progress in terms writing simple relevant CYPHER queries and building up the REST infrastructure. We have realised we need to not only concetrate on our focus area, but also other areas.







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
