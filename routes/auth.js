const   express = require('express');
const   router  = express.Router();
const { authPage, isAuthenticated, signUp, signIn, signOut } = require ('../controller/auth');
const { sessionToBody } = require ('../utilities/sessionator')

module.exports = (app, passport) => {

    app.use('/auth', router);

    router.get ('/', authPage);
    router.get ('/checkauth',isAuthenticated)
    router.post('/sign_up' ,/*-----------------------------------------*/signUp);
    router.post('/sign_in' ,sessionToBody,passport.authenticate('local'),signIn);
    router.post('/sign_out',/*----------------------------------------*/signOut);
    router.get ('/facebook',/*----------*/passport.authenticate('facebook'));
    router.get ('/facebook/callback',/*-*/passport.authenticate('facebook', { failureRedirect: '/' }),
    async (req, res) => {res.redirect('/');});
    router.get ('/google',  );
};