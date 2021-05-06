const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.init = function(app)
{
    passport.use(new Strategy
        (function(username,password,cb)
           {
               userModel.lookup(username, function(err, user)
               {
                   if(err)
                   {
                       console.log('error looking up user', err);
                       return cb(err);
                   }
                   if(!user)
                   {
                       console.log('user', username, 'not found');
                       return cb(null, false);
                   }
                   bcrypt.compare(password, user.password,
                    function(err, result) {
                        if (result)
                        {
                            cb(null, user);
                        }
                        else 
                        {
                            cb(null, false);
                        }
                    });
               });
           }));

   passport.serializeUser(function(user,cb)
   {
       cb(null, user.user);
   });

   passport.deserializeUser(function(id, cb)
   {
       userModel.lookup(id, function(err, user)
       {
           if(err) {return cb(err);}
           cb(null, user);
       });
   });

};

exports.authorize = function(redirect)
{
    return passport.authenticate('local', {failureRedirect: redirect});
};

