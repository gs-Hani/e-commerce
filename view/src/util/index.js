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