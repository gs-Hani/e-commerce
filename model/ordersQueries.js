const db = require('../db')

const createNewOrder  = /*--------*/async (data) => {
  const/*------------*/{ total,user_id } = data;
  const  values       = [total,user_id ];
  const  statement    = `INSERT INTO orders (total, user_id) VALUES ($1, $2) RETURNING *`;
  const  result       = await db.query(statement, values);
  if   (!result)      { throw error };
  return result.rows[0];
};

const addItemToOrder = /*--------------------------------------------*/async (data) => {
  const/*-----------*/{ order_id, product_id, name, unit_price, quantity  } = data;
  const  values      = [order_id, product_id, name, unit_price, quantity];
  const  statement   = `INSERT INTO order_items (order_id, product_id, name, unit_price, quantity) 
                        VALUES ($1, $2, $3, $4, $5) 
                        RETURNING *`;
  const  result      = await db.query(statement, values);
  if   (!result) { throw error };
  return result.rows[0];
};

const updateOrderByIds = /*----------------------------*/async (data) => {
  const/*-------------*/{ total, status, user_id, order_id  } = data;
  const  values        = [total, status, user_id, order_id];
  const  statement     = `UPDATE orders 
                          SET    total   = $1, status = $2 
                          WHERE  user_id = $3 AND order_id = $4
                          RETURNING *`;
  const  result        = await db.query(statement, values);
  if   (!result)       { throw error };
  return result.rows[0];
};

const getOrdersById = async (data) => {
  const  values     =       [data];
  const  statement  = `SELECT * FROM orders WHERE user_id = $1`;
  const  result     = await db.query(statement, values);
  if   (!result)    { throw error };
  return result.rows;
};

const getOrder = async (data) => {
  const /*--------*/{ order_id } = data;
  const  values    = [order_id];
  const  statement = `SELECT * FROM order_items WHERE order_id = $1`;
  const  result    = await db.query(statement, values);
  if   (!result) { throw error };
  return result.rows;
};

module.exports = {
    createNewOrder,
    addItemToOrder,
    updateOrderByIds,
    getOrdersById,
    getOrder
};