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
            //embedded mode not set?
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
            trainingGoal: '3 sets of 10 reps - squats',
            startDate: Date.now(), 
            achieved: 'Yes'
        }); 
        console.log('db entry squats inserted'); 


        this.db.insert({ 
            trainingGoal: '1 set of 10 reps - lunges',
            startDate: Date.now(), 
            achieved: 'No'
        });
    
        console.log('db entry lunges inserted');
    }

    getAllLogs()
    {
        return new Promise((resolve, reject) => {

        this.db.find({}, function (err, logs) {
        
          if (err)
          {
              reject(err);
              console.log('get all logs promise rejected:', err);
          }
          else{
              resolve(logs);
              console.log('function all() returns: ', logs);
          }
        })
    })

  }

}//end of class

//make module(file) visible outside of this file
//
module.exports = Training;