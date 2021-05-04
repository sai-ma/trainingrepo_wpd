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

exports.show_user_goals = function(req,res)
{
    console.log('filtering author name', req.params.author);

    let user = req.params.author;
    db.getGoalsByUser(user).then((goals) => {
        res.render('goals', {
            'title': 'Training Me',
            'goals': goals
        });
    }).catch((err) => {
        console.log('error handling author posts', err);
    });
}

exports.new_entry = function(req, res) 
{    
     res.render('newEntry', {'title': 'Training'})
}

exports.post_new_entry = function(req, res) {
  console.log('processing post-new_entry controller');

  if (!req.body.author) {
      response.status(400).send("Goal entries must have an author.");
      return;
  }

  db.addEntry(req.body.author, req.body.trainingGoal, req.body.achieved);
  res.redirect('/mygoals');
}


//delete goal
exports.delete_goal = function (req,res)
{
  console.log('id in delete_goal', req.params.id);
  //res.send('<h1>Delete goal called</h1>' );

  db.deleteGoal(req.params.id);
  res.redirect('/mygoals');
}








exports.not_found = function(req, res) 
{
     res.status(404);
     res.send('Oops! we didn\'t find what you were looking for.');
}