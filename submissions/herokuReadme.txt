Starting Heroku:



1. Create an account.



2. Select a Language to start and build an app


    
    I have selected Node.js

3.for managing and scaling the apps Heroku toolbet is required
 

    
    https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up (Link to download the toolbet)


    
    Select which OS you are working on before downloading.



4.The next step is to login from the command prompt


    
    Enter your Heroku credentials



5. To check Heroku we will need a test app


    
    Download the test app from github


    
    git clone https://github.com/heroku/node-js-getting-started.git


    
    cds cd node-js-getting-started



6. The next step is to deploy the app


    
    heroku create app


    
    This command will help Heroku to receive the souce code and also git remote is added to the local git repository



7.After doing any changes if any its time to deploy the app


    
    git push heroku master


    
    This command will push the source code to the master



8.To ensure that atleast one instance is running


    
    heroku ps:scale web =1 

9.To open the app


    
    heroku open

    

Some errors faced while pushing the app:
 "Heroku - Fatal error when pushing to a git repository"
 

Solution:

 
 1. git init


 
 2. git add .


 
 3. git commit -m "First app"


 
 4. git push heroku master