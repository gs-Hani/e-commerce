const passport = require('passport');   
const LocalStrategy = require('passport-local').Strategy;
const { sign_in } = require('../services/authService')


module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser((user, done) => {
        done(null,user.id);
    });
      
    passport.deserializeUser((id,done) => {
        done(null,{ id });
      });
    
    passport.use(
        new LocalStrategy(async function (username, password, done) {
          try {
            const user = await sign_in({email:username, password});
            return done (null, user);
          } catch (err) {
            return done(err);
          }
          
        })
    ); 

    return passport;
};
