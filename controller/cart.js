const { addItem, 
        removeItem, 
        updateCartItem, 
        loadCartItems, checkout } = require('../services/cartsService');
const { ensureAuthentication }    = require('../services/authService');

exports.loadCart = async (req, res, next) => {
    try {
        console.log('loading DB cart');
        const {cart_id} = req.params;
        console.log('cart_id data type ==',typeof cart_id );
        if(cart_id == "null") { next() }
        else {
            req.body = await loadCartItems(cart_id);
            console.log(req.body);
            console.log('loading DB cart done');
            next();
        }
    } catch (err) { 
      next  (err) };
};

exports.addItem = async (req,res,next) => {
    try {
        const auth = await ensureAuthentication(req);
        if  (!auth)  { next() } 
        else {
            const { user_id } = req.user;
            await req.body.forEach(product_id => addItem({user_id, product_id}));
            next()
        };
    } catch (err) { 
      next  (err) };
};

exports.removeItem = async (req,res,next) => {
    try {
        const auth = await ensureAuthentication(req);
        if  (!auth)  { next() } 
        else {
            const { user_id }    = req.user;
            await req.body.forEach(product_id => removeItem({user_id, product_id}));
            next()
        };

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

exports.addToSession = async (req, res, next) => {
    try {
        console.log('request body is', req.body)
        if(!req.session.cartProducts) { 
            req.session.cartProducts = req.body;
            console.log('cartProducts does not exisit so cartproducts now is...',req.session.cartProducts);
        }
        else {
            console.log('changing the session cart products');
            req.session.cartProducts.filter(index => {
                let unique = true
                for (let i=0; i<req.body.length; i++) {
                    if (index === req.body[i].product_id) { unique = false ; }
                }
                return unique
            });
            req.session.cartProducts = [...req.session.cartProducts,...req.body];
            console.log('cartProducts does exisit so cartproducts now is...',req.session.cartProducts);
        }
        res.status(200).send(req.session.cartProducts);
    } catch (err) {
      next  (err)  
    }
};

exports.removeFromSession = async (req, res, next) => {
    try{
        if(req.session.cartProducts) {
            req.session.cartProducts = req.session.cartProducts.filter(obj => {
                obj != req.body[0]
            })
        }
        res.status(200).send(req.session.cartProducts);
    } catch (err) {
      next  (err)
    }
};

exports.loadSessionCart = async (req, res, next) => {
    try {
        const    {cart_id} = req.params;
        if(cart_id == "null") {
            if(!req.session.cartProducts) { req.session.cartProducts = []};
                       res.status(200).send(req.session.cartProducts)
        } else {
            const cartproducts = [...new Set(req.body.concat(req.session.cartProducts))];
            console.log('the combined cart products are...:',cartproducts);
            res.status(200).send(cartproducts);
        } 
    } catch (err) {
      next  (err)
    }
};