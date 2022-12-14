const { addItem, 
        removeItem, 
        updateCartItem, 
        loadCartItems, checkout } = require('../services/cartsService');
const { ensureAuthentication }    = require('../services/authService');

exports.loadCart = async (req, res, next) => {
    try {
        
        const/*----------------------------------------*/{cart_id} = req.params;
        const/*------------*/result = await loadCartItems(cart_id);
        res.status(200).send(result);

    } catch (err) { 
      next  (err) };
};

exports.addItem = async (req,res,next) => {
    try {
        const auth = await ensureAuthentication(req);
        if  (!auth)  { res.redirect('./auth') } 
        else {
            const { user_id }    = req.user;
            const { product_id } = req.params;

            const/*------------*/result = await addItem({user_id, product_id});
            res.status(200).send(result);
        };
    } catch (err) { 
      next  (err) };
};

exports.removeItem = async (req,res,next) => {
    try {

        const { cart_id, product_id } = req.params;

        const/*------------*/result = await removeItem({cart_id, product_id});
        res.status(404).send(result);

    } catch (err) { 
      next  (err) };
}

exports.updateItem = async (req, res, next) => {
    try {
        const { cart_id, product_id } = req.params;
        const { quantity }            = req.body;

        const/*------------*/result   = await updateCartItem({cart_id, product_id, quantity});
        res.status(200).send(result);

    } catch (err) { 
      next  (err) };
}

exports.checkout = async (req, res, next) => {
    try {
        const { credit }  = req.user;
        const { cart_id } = req.params;

        const                 result = await checkout({credit, cart_id});
        res.status(200).send({result});

    } catch (err) { 
      next  (err) };
}