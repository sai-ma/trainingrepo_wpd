const trainingDAO = require('../models/trainingModel');
const db = new trainingDAO();

exports.landing_page = function (req, res)
{
    res.send('Hello! Welcome to  my app from controller');
    db.init();
}

exports.trainingLog_page = function (req, res)
{
  db.getAllEntries().then((list) => {        
     res.render('entries', {
        'title': 'Guest Book', 
        'entries': list        
       });         
       
       console.log('promise resolved'); 

       }).catch((err) => {         
         console.log('promise rejected', err);    
         })


}//end of end point?



exports.about_page = function(req, res) 
{
    res.redirect('./about.html');
}

exports.new_entry = function(req, res) 
{    
     res.send('<h1>Not yet implemented: show a new entry page.</h1>'); 
}

exports.not_found = function(req, res) 
{
     res.status(404);
     res.send('Oops! we didn\'t find what you were looking for.');
}