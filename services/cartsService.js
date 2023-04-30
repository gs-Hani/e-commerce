const { addItemToCart,
        removeItemFromCart, 
        removeِAllItemsFromCart, 
        eraseCart, 
        getCartById, 
        updateCart, 
        getCartItems, 
        createCart }                            = require('../model/cartsQueries');
const { createOrder,updateOrder, addOrderItem } = require('../services/ordersService');
const { updateFunds }                           = require('../services/usersService');

async function checkCart (user_id) {
  try {

    let          cart = await getCartById(user_id);
    if  (!cart) {cart = await createCart (user_id)};

    if  (!cart) {
      const err        = new Error('Cart could not be created');
            err.status = 502;
      throw err;
    };

    return cart;

  } catch (err) {
    throw (err) };
};

async function loadCartItems (cart_id) {
    try {

        let                 loadedCart = await checkCart(cart_id);
        if   (loadedCart) { loadedCart = await getCartItems(cart_id) };
              loadedCart = loadedCart.map(product => product.product_id);
        if   (loadedCart === [] || loadedCart) {
          return loadedCart;
        } else {
          const err        = new Error('Could not load cart');
                err.status = 502;
          throw err;
        }
    } catch (err) {
      throw (err) }; 
};

async function addItem (data) {
    try {
        const { user_id, product_id } = data;

        let   userCart                = await getCartById  (          user_id);
        if  (!userCart) { userCart    = await createCart   ({ cart_id:user_id })};
        console.log(userCart);
        const addedItem /*---------*/ = await addItemToCart({ cart_id:user_id, product_id });
        if  (!addedItem) {
            const err = new Error('Item was not added, please try again');
                  err.status = 502;
            throw err;
        };
        console.log(addedItem);
        return addedItem;
    } catch (err) {
      throw (err);
} 
};

async function removeItem (data) {
    try {

        const { user_id, product_id } = data;
        const  removedItem   = await removeItemFromCart({cart_id:user_id, product_id});
        console.log(removedItem);
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
    checkCart,
    addItem,
    removeItem,
    deleteCart,
    loadCartItems,
    updateCartItem,
    checkout
};