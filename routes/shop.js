const express = require('express');
const router  = express.Router();
const { shopPage, products, productById} = require('../controller/shop');

module.exports = (app) => {
    app.use('/shop', router);

    router.get('/', shopPage);
    router.get('/products', products);
    router.get('/products/:product_id', productById);
};