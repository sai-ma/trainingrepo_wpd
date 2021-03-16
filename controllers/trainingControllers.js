const trainingDAO = require('../models/trainingModel');
const db = new trainingDAO();

exports.landing_page = function (req, res)
{
    res.send('My Training Page');
    db.init();
}

exports.trainingGoals_page = function (req, res)
{
  db.getAllGoals().then((list) => {        
     res.render('goals', {
        'title': 'Training Logs', 
        'goals': list        
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