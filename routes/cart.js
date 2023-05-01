const   express = require('express');
const   router  = express.Router();
const { loadCart, 
        addItem, 
        removeItem, 
        updateItem, 
        checkout, 
        addToSession,
        removeFromSession,
        loadSessionCart } = require('../controller/cart');
const { validateCart, validateProduct } = require('../utilities/validator');

module.exports = (app) => {

    app.use('/cart', router);

    //session only routes =============================================================
    // router.post  ('/:product_id',                       validateProduct, addToSession);
    router.get   ('/session',                                            loadSessionCart);
    //authenticated routes ============================================================
    router.get   ('/:cart_id',            validateCart,                  loadCart,loadSessionCart);
    router.post  ('/addItem',                           validateProduct, addItem,    addToSession);
    router.delete('/removeItem',                        validateProduct, removeItem, removeFromSession);
    router.put   ('/:cart_id/:product_id',validateCart, validateProduct, updateItem);
    router.post  ('/:cart_id/checkout',   validateCart,                  checkout);
    
};