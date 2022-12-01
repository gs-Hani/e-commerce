const   express = require('express');
const   router  = express.Router();
const { loadCart, addItem, removeItem, updateItem, checkout } = require('../controller/cart')

module.exports = (app) => {

    app.use('/cart', router);

    router.get   ('/:cart_id', loadCart);
    router.post  ('/:product_id', addItem);
    router.delete('/:cart_id/:product_id',removeItem);
    router.put   ('/:cart_id/:product_id', updateItem);
    router.post  ('/:cart_id/checkout', checkout);
};