const { addItemToCart,
        removeItemFromCart, 
        removeِAllItemsFromCart, 
        eraseCart, 
        getCartById, 
        updateCart, 
        getCartItems, 
        createCart }                            = require('../queiries/cartsQueries');
const { createOrder,updateOrder, addOrderItem } = require('../services/ordersService');
const { updateFunds }                           = require('../services/usersService');

async function loadCartItems (cart_id) {
    try {
        const loadedCart = await getCartItems(cart_id);
        if  (!loadedCart) {
            const err        = new Error('could not load cart');
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

        let     userCart              = await getCartById  (user_id);
        
        if  (!userCart) { userCart    = await createCart   ({ cart_id:user_id })};
        const addedItem /*---------*/ = await addItemToCart({ cart_id:user_id, product_id });
        
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
        const  removedItem   = await removeItemFromCart(data);
        if   (!removedItem) {
            const err        = new Error('could not remove item');
                  err.status = 502;
            throw err;
        };
        return removedItem;
    } catch (err) {
      throw (err);
    } 
};

async function deleteCart  (data) {
    try {
        const cart_id     = data;
        const deletedCart = await eraseCart(cart_id);
        if  (!deletedCart) {
            const err        = new Error('Could not erase cart');
                  err.status = 502;
            throw err;
          };
        return deletedCart;
    } catch (err) {
      next  (err);
    };
};

async function updateCartItem (data) {
    try {
        const updatedCartItem = await updateCart(data);
        if  (!updatedCartItem) {
            const err         = new Error('could not update cart');
                  err.status  = 502;
            throw err;
        };
        return updatedCartItem;
    } catch (err) {
      throw (err);
    };
};

async function checkout (data) {
    try {
        const { credit, cart_id } = data;
        //check if the user has enogh money !--------------------------------------------------------------------
        const cartItems = await getCartItems(cart_id);
        const total     = await cartItems.reduce((total,item) => (total + item.price * item.quantity),0);
        const funds     = credit - total;
        if   (funds < 0) {
            const err        = new Error('Insufficient funds');
                  err.status = 502;
            throw err;
        };

        //place order !!-----------------------------------------------------------------------------------------
        let    order      = await createOrder ({user_id:cart_id, total});
        const {order_id}  = order; //needed for the following step

        //add cart items to the order !!-------------------------------------------------------------------------
        let    orderItems = [];
        async function addMultipleItems () {
          for (let i = 0; i < cartItems.length; i++) {
            const/*----------------------------*/{ product_id, name,            price, quantity } = cartItems[i];
            const orderItem = await addOrderItem ({order_id, product_id, name, unit_price:price, quantity});
                  orderItems.push(orderItem);
          };
        };
        await addMultipleItems ();
        
        //update cart, order and user credit----------------------------------------------------------------------
        const   cart       = await removeِAllItemsFromCart({cart_id});
        const   newCredit  = await updateFunds           ({cart_id, funds});
                order      = await updateOrder           ({order_id, total, status:'complete', user_id:cart_id}); 
        return {order, orderItems, cart, newCredit};
    } catch (err) {
      throw (err);
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