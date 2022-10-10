const {createNewOrder, updateOrderByIds, addItemToOrder, getOrdersById, getOrder} = require('../queiries/ordersQueries')

async function createOrder (data) {
    try { 
        const newOrder = await createNewOrder(data);
        if  (!newOrder) {
            const err = new Error('Failed to create order');
                  err.status = 502;
            throw err;
          };
          return newOrder;

    } catch (err) {
      throw (err);
    }
};

async function updateOrder (data) {
  try {
        const updatedOrder = await updateOrderByIds(data);
        if  (!updatedOrder) {
            const err = new Error('Failed to update order');
                  err.status = 502;
            throw err;
          };
          return updatedOrder;

    } catch (err) {
      throw (err);
    }
};

async function addOrderItem (data) {
    try {
        const orderItems = await addItemToOrder(data);
        if  (!orderItems) {
            const err = new Error('Failed to add items to the order');
                  err.status = 502;
            throw err;
          };
          return orderItems;

    } catch (err) {
      throw (err);
    }
};

async function loadOrders (data) {
  try {
      const loadedOrders = await getOrdersById(data);
      if  (!loadedOrders) {
          const err = new Error('Failed to load orders');
                err.status = 502;
          throw err;
        };
        return loadedOrders;

  } catch (err) {
    throw (err);
  }
};

async function loadOrderDetails (data) {
  try {
      const loadedOrder = await getOrder(data);
      if  (!loadedOrder) {
          const err = new Error('Failed to load order details');
                err.status = 502;
          throw err;
        };
        return loadedOrder;

  } catch (err) {
    throw (err);
  }
};

module.exports = {
    createOrder,
    updateOrder,
    addOrderItem,
    loadOrders,
    loadOrderDetails
};