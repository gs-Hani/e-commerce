const   express = require('express');
const   router  = express.Router();
const { authPage, signUp, signIn, signOut } = require('../controller/auth');

module.exports = (app, passport) => {

    app.use('/auth', router);

    router.get ('/', authPage);
    router.post('/sign_up', signUp);
    router.post("/sign_in", passport.authenticate('local'), signIn);
    router.get ("/sign_out", signOut );
};