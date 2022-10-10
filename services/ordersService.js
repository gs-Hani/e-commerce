const {createNewOrder, setOrder, addItemToOrder} = require('../queiries/ordersQueries')

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
        const updatedOrder = await setOrder(data);
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

module.exports = {
    createOrder,
    updateOrder,
    addOrderItem
};