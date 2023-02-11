const loadCart = async (cart_id) => {
    try { const  res = await fetch(`/cart/${cart_id}`,{ method:'GET' });
          return res.json();
    } catch (error) { return { error }; }
};
const addItem = async (product_id) => {
    try { const  res = await fetch(`/${product_id}`,{ method:'POST' });
          return res.json();
    } catch (error) { return { error }; }
};
const removeItem = async (cart_id, product_id) => {
    try { const  res = await fetch(`/${cart_id}/${product_id}`,{ method:'DELETE' });
          return res.json();
    } catch (error) { return { error }; }
};
const updateItem = async (cart_id, product_id) => {
    try { const  res = await fetch(`/${cart_id}/${product_id}`,{ method:'PUT' });
          return res.json();
    } catch (error) { return { error }; }
};
const checkout = async (cart_id) => {
    try { const  res = await fetch(`/${cart_id}/checkout`,{ method:'POST' });
          return res.json();
    } catch (error) { return { error }; }
};

module.exports = { loadCart, addItem, removeItem, updateItem, checkout }; //=============

const home = async () => {
    try { const  res = await fetch(`/`,{ method:'GET' });
          return res.json();
    } catch (error) { return { error }; }
};

module.exports = { home }; //=============================================================

const orders = async () => {
    try { const  res = await fetch('/orders',{ method:'GET' });
          return res.json();
    } catch (error) { return { error }; }
};

const orderById = async (order_id) => {
    try { const  res = await fetch(`/orders/${order_id}`,{ method:'GET' });
          return res.json();
    } catch (error) { return { error }; }
};

module.exports = { orders, orderById }; //===============================================

const userById = async (user_id) => {
    try { const  res = await fetch(`/users/${user_id}`,{ method:'GET' });
          return res.json();
    } catch (error) { return { error }; }
};

const updateUser = async (user_id) => {
    try { const  res = await fetch(`/users/${user_id}`,{ method:'PUT' });
          return res.json();
    } catch (error) { return { error }; }
};

const deleteUser = async (user_id) => {
    try { const  res = await fetch(`/users/${user_id}`,{ method:'DELETE' });
          return res.json();
    } catch (error) { return { error }; }
};

module.exports = { userById, updateUser, deleteUser }; //=================================