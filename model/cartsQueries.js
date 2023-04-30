const db = require('./index');

const addItemToCart = async (data) => {
  try {
    const /*--------*/ { product_id, cart_id } = data;
    const  values1    = [product_id, cart_id];
    const  statement1 = `INSERT INTO cart_items ( product_id, cart_id ) VALUES ($1, $2) RETURNING *`;

    const  result    = await db.query(statement1, values1);
    return result.rows[0];
    
  } catch (err) {
    throw (err)
  };
  
};

const removeItemFromCart =            async (data) => {
  try {
    const /*--------*/{ cart_id, product_id } = data;
    const  values    = [cart_id, product_id];
    const  statement = `DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *`; 

    const  result   = await db.query(statement, values);
    return result.rows[0];

  } catch (err) {
    throw (err)
  }
  
};

const removeِAllItemsFromCart = async (data) => {
  const/*-------------*/{ cart_id } = data;
  const  values        = [cart_id];
  const  statement     = `DELETE FROM cart_items WHERE cart_id = $1 RETURNING *`; 

  const  result        = await db.query(statement, values);
  if   (!result)       { throw error }
  return result.command;
};

const getCartById = async (cart_id) => {
  const values    =       [cart_id];
  const statement = `SELECT * FROM carts WHERE cart_id = $1`;

  const  result   = await db.query(statement, values);
  if   (!result) { throw error };
  return result.rows[0];
};

const getCartItems = async (cart_id) => {
  const values     =       [cart_id];
  const statement  = `SELECT p.product_id 
                      FROM products AS p 
                      INNER JOIN cart_items AS ci 
                      ON p.product_id = ci.product_id 
                      WHERE cart_id = $1`;

  const  result    = await db.query(statement, values);
  if    (result.rows === [] || result.rows) {return result.rows} else { throw error }
};

const updateCart  = /*------------------------*/async (data) => {
  const            { cart_id, product_id, quantity } = data;
  const values    = [cart_id, product_id, quantity];
  const statement = `UPDATE cart_items SET quantity = $3 WHERE cart_id = $1 AND product_id = $2 RETURNING *`;

  const  result   = await db.query(statement, values);
  if   (!result) { throw error }
  return result.command;
};

const eraseCart   = async (cart_id) => {
  const values    =       [cart_id];
  const statement = `DELETE FROM carts WHERE cart_id = $1 RETURNING *`;

  const  result   = await db.query(statement, values);
  if   (!result) { throw error };
  return result.rows[0];
};

const createCart    =       async (data) => {
  const                cart_id   = data;
  const  values     = [cart_id];
  const  statement  = `INSERT INTO carts (cart_id) VALUES ($1) RETURNING *`;

  const  result     = await db.query(statement, values);
  if   (!result)    { throw error };
  return result.rows[0];
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  removeِAllItemsFromCart,
  eraseCart,
  getCartById,
  updateCart,
  getCartItems,
  createCart
};