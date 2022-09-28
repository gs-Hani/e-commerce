const express = require('express');
const router = express.Router();
const { sign_up, sign_in } = require('../services/authService');

module.exports = (app, passport) => {

    app.use('/auth', router);

    router.get('/', (req, res) => {
      res.send('<h1>Hello from your AUTH page!!</h1>');
    });
    
    router.post('/sign_up', async (req, res, next) => {
        try {
            const data = req.body;
            const response = await sign_up(data);
            res.status(200).send(response);
        } catch (err) {  
           next(err);
        }
    });
    
    router.post("/sign_in",passport.authenticate('local'), async (req, res, next) => {
      try {
        // const { username, password } = req.body;
      
        // const response = await sign_in({ email: username, password});
      
        // res.status(200).send(response);
        res.redirect('/shop');
      } catch(err) {
        next(err);
      }
    });

    router.get("/sign_out", (req, res) => {
        req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
        });
      });
};