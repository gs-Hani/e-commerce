const express = require('express');
const router = express.Router();
const cartsService = require('../queiries/cartsQueries');

module.exports = (app) => {

    app.use('/', router);

    router.get('/carts', cartsService.getCarts);
    router.get('/carts/:id', cartsService.getCartById);
    router.post('/carts', cartsService.createCart);
    router.put('/carts/:id', cartsService.updateCart);
    router.delete('/carts/:id', cartsService.deleteCart);
};