const { response } = require('express');
const trainingDAO = require('../models/trainingModel');
const userDAO = require('../models/userModel.js');
const db = new trainingDAO('training.db');


////function for when users access / url
exports.landing_page = function (req, res)
{
  res.redirect('./homepage.html');

    //db.init();
}

////function for when users access /goals url
exports.trainingGoals_page = function (req, res)
{
  db.getAllGoals().then((list) => {        
     res.render('goals', {
        'title': 'Training Goals', 
        'user': req.user,
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
            'user': req.user,
            'goals': goals
        });
    })
    .catch((err) => {
        console.log('error handling author posts: ')
        console.log(JSON.stringify(err))
    });
}

////function for when user accesses add new goal page /new url
exports.new_goal = function(req, res) 
{    
     res.render('newGoal', {'title': 'Training', 'user': req.user})
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


//function for after new user submits details on register
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

//function to display login page
exports.show_login_page = function(req,res)
{
  res.render("user/login");
};

//function to pass variables to verify registered user's details
exports.post_login = function(req, res)
{
  console.log('serializeUser wrote', req.session.passport.user);
  res.redirect('/goals');
}

//function to logout currently logged in user
exports.logout = function(req,res)
{
  req.logout();
  res.redirect('/goals');
};


////for urls not accounted for
exports.not_found = function(req, res) 
{
     res.status(404);
     res.send('Oops! we didn\'t find what you were looking for.');
}