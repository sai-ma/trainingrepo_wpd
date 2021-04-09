const express = require('express');
const path = require('path');
const router = require('./routes/trainingRoutes')
const mustache = require('mustache-express');
const bodyParser = require('body-parser');




//use express to create a web application
const app = express();
const views = path.join(__dirname, 'views');

//mustache
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.use(express.static(views));

//body parser
app.use(bodyParser.urlencoded({extended:false}));





//only one line needed on index to reroute all routes apparently
app.use('/',router);




app.listen(8000, () => 
{
    console.log('Server started on port 8000. Ctrl^c to quit.');
})