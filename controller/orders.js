const { loadOrders, loadOrderDetails } = require('../services/ordersService');
const { ensureAuthentication }         = require('../services/authService');

exports.orders = async (req, res, next) => {
    try {
        const auth = await ensureAuthentication(req);
        if  (!auth) { res.redirect('/auth') } 
        else {
            const/*------------------------------------*/{ user_id } = req.user;
            const/*------------*/result = await loadOrders(user_id);
            res.status(200).send(result);
        };
    } catch (err) { 
      next  (err) };
};

exports.orderById = async (req, res, next) => {
    try {
        const/*------*/{ order_id } = req.params;
        const/*-------*/{ user_id } = req.user;
        const/*----------*/result   = await loadOrderDetails({user_id, order_id});
        res.status(200).send(result);

    } catch (err) { 
      next  (err) };
};