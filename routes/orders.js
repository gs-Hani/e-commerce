const express = require('express');
const router = express.Router();
const ordersService = require('../services/ordersService');

module.exports = (app) => {

    app.use('/', router);

    router.get('/orders', ordersService.getOrders);
    router.get('/orders/:id', ordersService.getOrderById);
    router.post('/orders', ordersService.createOrder);
    router.put('/orders/:id', ordersService.updateOrder);
    router.delete('/orders/:id', ordersService.deleteOrder);
};
