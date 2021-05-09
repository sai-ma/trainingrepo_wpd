const express = require('express');
const session = require('express-session');
const router = require('./routes/trainingRoutes')
const path = require('path');
const mustache = require('mustache-express');
const auth = require('./auth/auth.js');
const passport = require('passport');
//const bodyParser = require('body-parser');
//body-parser not needed

const app = express();




const views = path.join(__dirname, 'views');
app.use(express.static(views));
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use(express.urlencoded({ extended: false }));

app.use(session({secret: 'dont tell anyone', resave: false,
saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

auth.init(app);


app.use('/',router);

app.listen(8000, () => 
{
    console.log('Server started on port 8000. Ctrl^c to quit.');
})