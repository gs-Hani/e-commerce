const express = require('express');
const router  = express.Router();
const { shopPage, products, productById} = require('../controller/shop');
const { validateProduct }                = require('../utilities/validator');

module.exports = (app) => {
    app.use('/shop', router);

    router.get('/', shopPage);
    router.get('/products', products);
    router.get('/products/:product_id',validateProduct, productById);
};