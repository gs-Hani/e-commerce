const   express = require('express');
const   router  = express.Router();
const { authPage, signUp, signIn, signOut } = require ('../controller/auth');
const { validateUserData, validateSignIn }  = require ('../utilities/validator');

module.exports = (app, passport) => {

    app.use('/auth', router);

    router.get ('/', authPage);
    router.post('/sign_up', signUp);
    router.post("/sign_in",validateSignIn, passport.authenticate('local'), signIn);
    router.get ("/sign_out", signOut );
};