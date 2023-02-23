const   passport         = require('passport');   
const   LocalStrategy    = require('passport-local').Strategy;
const   FacebookStrategy = require('passport-facebook').Strategy;
const { FACEBOOK }       = require('../model/config');
const { facebookLogin }  = require('../services/authService');

const { sign_in }        = require('../services/authService');
const { userById }       = require('../services/usersService');
const { validateSignIn } = require('../utilities/validator');


module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser((user, done) => {
      done(null,user.user_id);
    });
      
    passport.deserializeUser(async (user_id,done) => {

      const user   = await userById(user_id);
      const credit = user.credit;

      return done(null, {user_id, credit});
    });
    
    passport.use(
        new LocalStrategy(async function (username, password, done) {
          try {
            const  valData = await validateSignIn({email:username, password});
            const  user    = await sign_in(valData);
            return done (null, user);

          } catch      (err) {
            return done(err);
          }
        })
    );

    passport.use(
      new FacebookStrategy({
        clientID:     FACEBOOK.appId,
        clientSecret: FACEBOOK.secret,
        callbackURL:  FACEBOOK.callbackUrl
      }, 
      async (accessToken, refreshToken, profile, done) => {
        try {
          // const  user = await facebookLogin(profile);
          return done(null, user);
        } catch      (err) {
          return done(err)
        }
      })
    );

    return passport;
};
