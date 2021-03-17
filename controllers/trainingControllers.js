const trainingDAO = require('../models/trainingModel');
const db = new trainingDAO('training.db');

exports.landing_page = function (req, res)
{
  res.redirect('./homepage.html');

    db.init();
}

exports.trainingGoals_page = function (req, res)
{
  db.getAllGoals().then((list) => {        
     res.render('goals', {
        'title': 'Training Goals', 
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
     res.render('newEntry', {'title': 'Training'})
}

exports.not_found = function(req, res) 
{
     res.status(404);
     res.send('Oops! we didn\'t find what you were looking for.');
}