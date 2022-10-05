const db = require('../db')

const getProducts = async () => {
  const statment = `SELECT * FROM products ORDER BY product_id ASC`;
  const result = await db.query(statment);

  if (!result) { throw error }
  return result.rows;
};

const getProductsBycategory = async (category) => {
  const value = [category];
  const statment = `SELECT * FROM products WHERE category_id = $1 ORDER BY product_id ASC`;
  const result = await db.query(statment, value);

  if (!result) { throw error }
  return result.rows;
};

const getProductById = async (id) => {
  const values = [id];
  const statment = `SELECT * FROM products WHERE id = $1`;
  const result = await db.query(statment, values);

  if (!result) { throw error }
  return result.rows[0];
};

const createProduct = (request, response) => {
  const { id,name, price, description } = request.body

  db.query('INSERT INTO products (id, name, price, description) VALUES ($1, $2, $3, $4) RETURNING *',
   [id,name, price, description],
    (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(201).send(`Product added with ID: ${results.rows[0].id}`)
  })
};

const updateProduct = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email, description } = request.body

  db.query(
    'UPDATE products SET user_name = $1, email = $2, description = $3 WHERE id = $4 RETURNING *',
    [name, email,description, id],
    (error, results) => {
      if (error) {
        throw error
      } if (typeof results.rows == 'undefined') {
      	response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
      	response.status(404).send(`Product not found`);
      } else {
  	 	  response.status(200).send(`Product modified with ID: ${results.rows[0].id}`)         	
      }
    }
  )
};

const deleteProduct = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Product deleted with ID: ${id}`)
  })
};

module.exports = {
  getProducts, 
  getProductsBycategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};