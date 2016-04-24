TO START THE SERVER

/home/vinit/neo4j/neo4j-community-2.3.3/bin/neo4j start


CREATE NODE QUERIES

CREATE (product_1:Product_1:Product { productNo:1,productName:"United Jersey",productCost:51 })

CREATE (product_2:Product_2:Product { productNo:2,productName:"Chelsea Jersey",productCost:21})

CREATE (product_3:Product_3:Product { productNo:3,productName:"Tottenham Jersey",productCost:31})

CREATE (product_4:Product_4:Product { productNo:4,productName:"Real Madrid Jersey",productCost:310})


MATCH (p: Product)
RETURN p

CREATE (product_1:Product)-[like:RECOMMENDS]->(product_2:Product) 
--- NEW NODES ARE CREATED ALONG WITH RELATION SHIP


MATCH (product_1:Product)-[like:RECOMMENDS]->(product_2:Product) 
RETURN product_1,product_2,like


MATCH (product_1:Product_1),(product_2:Product_2)
CREATE (product_1)-[like:RECOMMENDS ]->(product_2) 
RETURN product_1,product_2


MATCH (product_1:Product_1),(product_2:Product_2)
CREATE (product_1)-[like:RECOMMENDS ]->(product_2)
RETURN like

MATCH (product_2:Product_2),(product_3:Product_3)
CREATE (product_2)-[like:RECOMMENDS ]->(product_3)
RETURN like

MATCH (product_3:Product_3),(product_1:Product_1)
CREATE (product_3)-[like:RECOMMENDS ]->(product_1)
RETURN like



MATCH (product_3:Product)-[like:RECOMMENDS ]->(product_1:Product)
WHERE product_3.productNo=2
RETURN product_1


MATCH (product_3:Product)-[like:RECOMMENDS ]->(product_1:Product)
SET like.power=1


//curl  -H "Content-Type: application/json"  -X PUT -d  '{ "power" : 10 }' http://localhost:7474/db/data/relationship/5/properties
