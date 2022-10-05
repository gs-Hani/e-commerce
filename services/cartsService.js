const { addItemToCart, removeItemFromCart, eraseCart, getCartById, updateCart, getCartItems, createCart } = require('../queiries/cartsQueries');

async function loadCartItems (cart_id) {
    try {
        const loadedCart = await getCartItems(cart_id);
        if  (!loadedCart) {
            const err = new Error('could not load cart');
                  err.status = 502;
            throw err;
          };
          return loadedCart;
    } catch (err) {
      throw (err);
    } 
};

async function addItem (data) {
    try {
        const { user_id, product_id } = data;

        let  userCart             = await getCartById  (user_id);
        
        if (!userCart) { userCart = await createCart   ({ cart_id:user_id })};
        const addedItem           = await addItemToCart({ cart_id:user_id, product_id });
        
        if  (!addedItem) {
            const err = new Error('Item was not added, please try again');
                  err.status = 502;
            throw err;
        };
          return addedItem;
    } catch (err) {
      throw (err);
    } 
};

async function removeItem (data) {
    try {
        const removedItem = await removeItemFromCart(data);
        if  (!removedItem) {
            const err = new Error('could not remove item');
                  err.status = 502;
            throw err;
          };
          return removedItem;
    } catch (err) {
      throw (err);
    } 
};

async function deleteCart (data) {
    try {
        const { cart_id } = data;
        const deletedCart = await eraseCart(cart_id);
        if  (!deletedCart) {
            console.log('could not erase cart');
            res.sendStatus(502);
            return;
          };
          return deletedCart;
    } catch (err) {
        console.log(err);
    };
};

async function updateCartItem (data) {
    try {
        const updatedCartItem = await updateCart(data);
        if  (!updatedCartItem) {
            const err = new Error('could not update cart');
                  err.status = 502;
            throw err;
          };
          return updatedCartItem;
    } catch (err) {
      throw (err);
    };
};

async function checkout (data) {
    try {
        const cartItems = await getCartById(cart_id); 
        const order = 0;
        if  (!order) {
            console.log('could not place order');
            res.sendStatus(502);
            return;
          };
          return order;
    } catch (err) {
        console.log(err);
    };
};

module.exports = {
    addItem,
    removeItem,
    deleteCart,
    loadCartItems,
    updateCartItem,
    checkout
};