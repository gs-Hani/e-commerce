const db = require('../db')


const getCarts = (request, response) => {
  db.query('SELECT * FROM cart ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  }) 
};

const getCartById = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM cart WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const createCart = (request, response) => {
  const { id,user_id, created, modified } = request.body

  db.query('INSERT INTO cart (id, user_id, created, modified) VALUES ($1, $2, $3, $4) RETURNING *',
   [id,user_id, created, modified],
    (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(201).send(`Cart added with ID: ${results.rows[0].id}`)
  })
};

const updateCart = (request, response) => {
  const id = parseInt(request.params.id)
  const { modified } = request.body

  db.query(
    'UPDATE cart SET modified = $1 WHERE id = $2 RETURNING *',
    [modified, id],
    (error, results) => {
      if (error) {
        throw error
      } if (typeof results.rows == 'undefined') {
      	response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
      	response.status(404).send(`Cart not found`);
      } else {
  	 	  response.status(200).send(`Cart modified with ID: ${results.rows[0].id}`)         	
      }
    }
  )
};

const deleteCart = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('DELETE FROM cart WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Cart deleted with ID: ${id}`)
  })
};

module.exports = {
    getCarts,
    getCartById,
    createCart,
    updateCart,
    deleteCart
};