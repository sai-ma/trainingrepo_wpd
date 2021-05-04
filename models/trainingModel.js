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
    init() {
        this.db.insert({
            author: 'Bob',
            trainingGoal: '3 sets of 10 reps - squats',
            startDate: '08/03/2021', 
            achieved: 'Y'
        }); 
        console.log('db entry squats inserted'); 


        this.db.insert({ 
            author: 'Bobby',
            trainingGoal: '1 set of 10 reps - lunges',
            startDate: '15/03/2021', 
            achieved: 'N'
        });
    
        console.log('db entry lunges inserted');
    }

    //get all goals for mygoals page

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

//get goals from clicked user
  getGoalsByUser(authorName) {
    return new Promise((resolve, reject) => {
        this.db.find({ 'author': authorName }, function(err, goals) {
            if (err) {
                reject(err);
            } else {
                resolve(goals);
                console.log('function getEntriesByUser() returns: ', goals);
            }
        })
    })
}


//add goal
addEntry(author, trainingGoal, achieved) {
    var entry = {
        author: author,
        trainingGoal: trainingGoal,
        startDate: new Date().toISOString().split('T')[0],
        achieved: achieved
    }
    console.log('entry created', entry);

    this.db.insert(entry, function(err, doc) {
        if (err) {
            console.log('Error inserting document', trainingGoal);
        } else {
            console.log('document inserted into the database', doc);
        }
    })

}



}//end of class

//make module(file) visible outside of this file
//
module.exports = Training;