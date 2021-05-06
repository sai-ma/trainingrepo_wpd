const trainingDAO = require('../models/trainingModel');
const userDAO = require('../models/userModel.js');
const db = new trainingDAO('training.db');


////function for when users access / url
exports.landing_page = function (req, res)
{
  res.redirect('./homepage.html');

    db.init();
}

////function for when users access /goals url
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


}


////function for when users access /about.html url
exports.about_page = function(req, res) 
{
    res.redirect('./about.html');
}

////function for when users click author name hyperlink
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

////function for when user accesses add new goal page /new url
exports.new_goal = function(req, res) 
{    
     res.render('newGoal', {'title': 'Training'})
}




////function for after submitting to add new goal
exports.post_new_goal = function(req, res) {
  console.log('processing post-new_goal controller');

  if (!req.body.author) 
  {
      response.status(400).send("Goal entries must have an author.");
      return;
  }

  db.addEntry(req.body.author, req.body.targetArea, req.body.trainingGoal, req.body.achieved);
  res.redirect('/goals');
}





////delete goal
exports.delete_goal = function (req,res)
{
  console.log('id in delete_goal', req.params.id);
  //res.send('<h1>Delete goal called</h1>' );

  db.deleteGoal(req.params.id);
  res.redirect('/goals');
}



//function to show register page
exports.show_register_page = function(req,res)
{
  res.render("user/register");
}


exports.post_new_user = function(req,res)
{
  const user = req.body.username;
  const password = req.body.pass;

  if(!user || !password)
  {
    res.send(401, 'no user or no password');
    return;
  }
  userDAO.lookup(user, function(err, u)
  {
  if(u) 
  {
    res.send(401, "User exists", user);
    return;
  }
  userDAO.create(user, password);
  res.redirect('/login');
});


};


exports.show_login_page = function(req,res)
{
  res.render("user/login");
};



////for urls not accounted for
exports.not_found = function(req, res) 
{
     res.status(404);
     res.send('Oops! we didn\'t find what you were looking for.');
}