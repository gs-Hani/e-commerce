const express = require('express');
const router = express.Router();
const productsService = require('../services/productsService');

module.exports = (app) => {

    app.use('/', router);

    router.get('/products', productsService.getProducts);
    router.get('/products/:id', productsService.getProductById);
    router.post('/products', productsService.createProduct);
    router.put('/products/:id', productsService.updateProduct);
    router.delete('/products/:id', productsService.deleteProduct);
};