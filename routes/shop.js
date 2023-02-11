const express = require('express');
const router  = express.Router();
const { shopPage, products, productById, categories} = require('../controller/shop');
const { validateProduct }                            = require('../utilities/validator');

module.exports = (app) => {
    app.use('/shop', router);

    router.get('/', shopPage);
    router.get('/products', products);
    router.get('/categories', categories);
    router.get('/products/:product_id',validateProduct, productById);
};