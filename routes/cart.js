const   express = require('express');
const   router  = express.Router();
const { loadCart, addItem, removeItem, updateItem, checkout } = require('../controller/cart');
const { validateCart, validateProduct } = require('../utilities/validator');

module.exports = (app) => {

    app.use('/cart', router);

    router.get   ('/:cart_id',            validateCart,                     loadCart);
    router.post  ('/:product_id',                          validateProduct, addItem);
    router.delete('/:cart_id/:product_id',validateCart,    validateProduct, removeItem);
    router.put   ('/:cart_id/:product_id',validateCart,    validateProduct, updateItem);
    router.post  ('/:cart_id/checkout',   validateCart,                     checkout);
};