const db = require('../db')

const createNewOrder  = /*--------*/async (data) => {
  const/*------------*/{ total,user_id } = data;
  const  values       = [total,user_id ];
  const  statement    = `INSERT INTO orders (total, user_id) VALUES ($1, $2) RETURNING *`;
  const  result       = await db.query(statement, values);
  if   (!result) { throw error };
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
  const  result    = await db.query(statement, values);
  if   (!result) { throw error };
  return result.rows[0];
};

const getOrdersById = async (data) => {
  const values      =       [data];
  const statement   = `SELECT * FROM orders WHERE user_id = $1`;
  const result      = await db.query(statement, values);
  if  (!result) { throw error };
  return result;
};

const getOrder = async (data) => {
  const /*--------*/{ order_id } = data;
  const  values    = [order_id];
  const  statement = `SELECT * FROM order_items WHERE order_id = $1`;
  const  result    = await db.query(statement, values);
  if   (!result) { throw error };
  return result.rows;
};

//UNUSED QUERIES ============================================
const updateOrder = (request, response) => {
  const id = parseInt(request.params.id)
  const { total, modified, status } = request.body

  db.query(
    'UPDATE orders SET total = $1, modified = $2, status = $3 WHERE id = $4 RETURNING *',
    [total, modified,status, id],
    (error, results) => {
      if (error) {
        throw error
      } if (typeof results.rows == 'undefined') {
      	response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
      	response.status(404).send(`Order not found`);
      } else {
  	 	  response.status(200).send(`Order modified with ID: ${results.rows[0].id}`)         	
      }
    }
  )
};

const deleteOrder = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('DELETE FROM orders WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Order deleted with ID: ${id}`)
  })
};
//===========================================================

module.exports = {
    createNewOrder,
    addItemToOrder,
    updateOrderByIds,
    getOrdersById,
    getOrder
};