const passport = require('passport');   
const LocalStrategy = require('passport-local').Strategy;

const { sign_in } = require('../services/authService');
const { userById } = require('../services/usersService');


module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser((user, done) => {
      done(null,user.user_id);
    });
      
    passport.deserializeUser(async (user_id,done) => {
      const user = await userById(user_id);
      const credit = user.credit;
      return done(null, {user_id, credit});
    });
    
    passport.use(
        new LocalStrategy(async function (username, password, done) {
          try {
            const/*--------- */user = await sign_in({email:username, password});
            return done (null, user);

          } catch/*--*/(err) {
            return done(err);
          }
        })
    ); 

    return passport;
};
