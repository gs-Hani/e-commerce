const db = require('../db')


const getOrders = (request, response) => {
  db.query('SELECT * FROM orders ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getOrderById = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM orders WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const createOrder = (request, response) => {
  const { id,total, created_at, modified,status,user_id } = request.body

  db.query('INSERT INTO orders (id, total, created_at, modified, status, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
   [id,total, created_at, modified, status, user_id],
    (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(201).send(`Order added with ID: ${results.rows[0].id}`)
  })
};

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

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};