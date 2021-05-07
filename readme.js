//This is the readme file for WPD2 cw1 
//application is intended to provide logging system for fitness goals

//Since this is a basic prototype, the files should be run ideally from vscode

//INSTALLATION
//- node.js with npm, along with node package manager
// https://nodejs.org/en/download/

//if package.json is missing, enter following command
//- npm init

//if package.json files are not downloaded with others
//run commands below in terminal
//from terminal within vscode
// - npm install express
// - npm install mustache-express
// - npm install path
// - npm install nedb
// - npm install bcrypt
// - npm install passport
// - npm install passport-local
// - npm install express-session
// - npm install connect-ensure-login

//RUN APPLICATION
// entry point of application is the index.js file
// to start running application, enter command below
// ->  node index
// in browser, runs on port 8000
// ->  localhost:8000

//URLS
// main URLS of localhost:8000
// - '/' home url of application
// - '/about.html' about page 
// - '/goals' goals page that displays all goals from training.db
// - '/login' attached to sign in button that displays login page
// - '/register' attached to register button that displays register page
// - '/new' attached to Write new goal button that is displays when users are logged in

//FUNCTIONS
// 

//DATABASES
// in the exports.landing_page function in trainingControllers.js, db.init has been commented out
// this is a personal choice to stop seeded data entering db every time
// the landing page was accessed. 
// to create the trainingdb database, uncomment the db.init() method
// the application will run in memory mode unless the database is present