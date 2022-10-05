const express = require('express');
const router = express.Router();
const { sign_up } = require('../services/authService');
const { deleteCart, loadCartItems } = require('../services/cartsService');

module.exports = (app, passport) => {

    app.use('/auth', router);

    router.get('/', (req, res) => {
      res.send('<h1>Hello from your AUTH page!!</h1>');
    });
    
    router.post('/sign_up', async (req, res, next) => {
        try {

            const                          data = req.body;
            const response = await sign_up(data);
            res.status(200).send(response);

        } catch (err) {  
          next  (err);
        }
    });
    
    router.post("/sign_in",passport.authenticate('local'), async (req, res, next) => {
      try {
        res.status(200).redirect('/shop');
      } catch (err) {
        next  (err);
      }
    });

    router.get("/sign_out", async (req, res, next) => {
      try {

        //check if the cart is empty to automatically delete it
        const { user_id } = req.user; 
        const notSoEmptyCart = await loadCartItems(user_id);
        console.log(notSoEmptyCart);
        if  (notSoEmptyCart.length === 0) { deleteCart({cart_id: user_id}); }

        //actually logout
        req.logout(function(err) {
        if (err)
          { return next(err); }
        res.status(200).redirect('/');
        });

      } catch (err) {  
       next(err);
      }
        
    });
};