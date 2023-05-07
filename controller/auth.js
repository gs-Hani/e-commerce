const { sign_up }/*---------------*/= require('../services/authService');
const { deleteCart, loadCartItems } = require('../services/cartsService');

exports.authPage = (req, res) => {
    try { res.send('<h1>Hello from your AUTH page!!</h1>');
    } catch (error) { return res.status(400).json({ error }); }
};

exports.isAuthenticated = (req,res,next) => {

  try {

    if (req.session.passport) {
      res.status(200).send(req.session.passport.user);
    } else {
      res.status(401)
    }
    
  } catch (err) {
    next  (err);
  }
  
}

exports.signUp = async (req, res, next) => {

    try {
      const/*-----------------------------*/{ user_name, email, password, date_of_birth } = req.body;
      const/*----------------------*/data = { user_name, email, password, date_of_birth };
      const response = await sign_up(data);
      res.status(200).send(response);
      
    } catch (err) {
      next  (err);
    }
}

exports.signIn = async (req, res, next) => {
  
    try {
      // req.session.user  = req.user;
      if (req.body.cartProducts) {
        req.session.cartProducts = req.body.cartProducts;
        console.log("body to session",req.session.cartProducts)
        delete req.body.cartProducts;
      }
      res.status(200).send(req.user);
      
    } catch (err) {
      next  (err);
    }
};

exports.signOut = async (req, res, next) => {
    try {

      //check if the cart is empty to automatically delete it
      const { user_id }             = req.body;
      let     notSoEmptyCart        = await loadCartItems(user_id);
      if     (notSoEmptyCart.length === 0) { 
              notSoEmptyCart        = await deleteCart   (user_id); }

      //actually logout----------
      req.logout(function(err) {
        if (err)
          { return next(err); }
        res.status(200).send(notSoEmptyCart);
      });

    } catch (err) {  
      next  (err);
    }    
};
