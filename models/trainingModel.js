//import nedb
const nedb = require('nedb'); 


class Training
{
    ////instantiate database in constructor
    constructor(dbFilePath) 
    { 
        if (dbFilePath) 
        { 
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
            //embedded mode
        }
        else 
        {
             this.db = new nedb();    
             console.log('db running in-memory mode');
             //in-memory mode
        }  
    }

    ////a function to seed the database
    ////don't really need anymore once already seeded
    init() {
        this.db.insert({
            author: 'Bob',
            targetArea: 'Upper Body',
            trainingGoal: 'bicep curls 2 sets 2 days',
            startDate: '08/03/2021', 
            achieved: 'Y'
        }); 
        console.log('db entry squats inserted'); 


        this.db.insert({ 
            author: 'Bobby',
            targetArea: 'Legs',
            trainingGoal: 'squats 2 sets 10 reps',
            startDate: '15/03/2021', 
            achieved: 'N'
        });
    
        console.log('db entry lunges inserted');
    }




    //get all goals for goals page
    getAllGoals()
    {
        return new Promise((resolve, reject) => {

        this.db.find({}, function (err, goals) {
        
          if (err)
          {
              reject(err);
              console.log('get all goals promise rejected:', err);
          }
          else{
              resolve(goals);
              console.log('function all() returns: ', goals);
          }
        })
    })

  }

//get goals from clicked author
  getGoalsByUser(authorName) {
    return new Promise((resolve, reject) => {
        this.db.find({ 'author': authorName }, function(err, goals) {
            if (err) {
                reject(err);
            } else {
                resolve(goals);
                console.log('function getGoalsByUser() returns: ', goals);
            }
        })
    })
}


//add goal to database
addEntry(author, targetArea, trainingGoal, achieved) 
{
    var goal = {
        author: author,
        targetArea: targetArea,
        trainingGoal:trainingGoal,
        achieved:achieved,
        startDate: new Date().toISOString().split('T')[0]
        
    }
    console.log('entry created', goal);

    this.db.insert(goal, function(err, doc) {
        if (err) {
            console.log('Error inserting document', targetArea);
        } else {
            console.log('document inserted into the database', doc);
        }
    })

}

//delete goal from database
deleteGoal(id)
{
    this.db.remove({_id: id}, {}, function(err, rem)
    {
        if (err)
        {
            console.log('error in deleteGoal', err);
        }
        else
        {
            console.log(rem, 'goal deleted');
        }
    })
}



}//end of class

//make module(file) visible outside of this file

module.exports = Training;