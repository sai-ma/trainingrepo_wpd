const express = require('express');
const path = require('path');
const router = require('./routes/trainingRoutes')
const mustache = require('mustache-express');




//use express to create a web application
const app = express();
const public = path.join(__dirname, 'public');
//instruct express to use folder 'public' for static resources
app.use(express.static(public));


//mustache
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

//only one line needed on index to reroute all routes apparently
app.use('/',router);




app.listen(8000, () => 
{
    console.log('Server started on port 8000. Ctrl^c to quit.');
})