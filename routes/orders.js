const   express/*---------*/= require('express');
const   router/*----------*/= express.Router();
const { orders, orderById } = require('../controller/orders')

module.exports = (app) => {

    app.use('/orders', router);

    router.get('/', orders);
    router.get('/:order_id', orderById);
};
