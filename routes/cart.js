const express = require('express');
const router = express.Router();
const { addItem, removeItem, updateCartItem, loadCartItems, checkout } = require('../services/cartsService');
const { ensureAuthentication } = require('../services/authService')

module.exports = (app) => {

    app.use('/cart', router);

    router.get('/:cart_id', async (req, res, next) => {
        try {
            const auth = await ensureAuthentication(req);
            if  (!auth) { res.redirect('./auth') };

            const/*----------------------------------------*/{cart_id} = req.params;
            const/*------------*/result = await loadCartItems(cart_id);
            res.status(200).send(result);

        } catch (err) { 
          next  (err) };
    });

    router.post('/:product_id', async (req,res,next) => {
        try {
            const auth = await ensureAuthentication(req);
            if  (!auth) { res.redirect('./auth') };

            const { user_id }    = req.user;
            const { product_id } = req.params;

            const/*------------*/result = await addItem({user_id, product_id});
            res.status(200).send(result);

        } catch (err) { 
          next  (err) };
    });

    router.delete('/:product_id',async (req,res,next) => {
        try {
            const auth = await ensureAuthentication(req);
            if  (!auth) { res.redirect('./auth') };

            const { user_id }         = req.user;
            const { product_id } = req.params;

            const                result = await removeItem({cart_id:user_id, product_id});
            res.status(404).send(result);

        } catch (err) { 
            next(err) };
    });

    router.put('/:product_id', async (req, res, next) => {
        try {
            const { user_id }    = req.user;
            const { product_id } = req.params;
            const { quantity }   = req.body;

            const                result = await updateCartItem({cart_id:user_id, product_id, quantity});
            res.status(404).send(result);

        } catch (err) { 
            next(err) };
    });

    router.post('./:cart_id/checkout', async (req, res, next) => {
        try {
            const { id }          = req.user;
            const { cart_id }     = req.params;
            const { paymentInfo } = req.body;

            const                result = await checkout({user_id: id, cart_id, paymentInfo});
            res.status(200).send(result);

        } catch (err) { 
            next(err) };
    });
};