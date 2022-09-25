const db = require('../db')


const getUsers = (request, response) => {
  db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const createUser = (request, response) => {
  const { id,user_name, email, password, date_of_birth, credit, created_at } = request.body

  db.query('INSERT INTO users (id, user_name, email, password, date_of_birth, credit, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
   [id,user_name, email, password, date_of_birth, credit, created_at],
    (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { user_name, email, password, date_of_birth } = request.body

  db.query(
    'UPDATE users SET user_name = $1, email = $2, password = $3, date_of_birth = $4 WHERE id = $5 RETURNING *',
    [user_name, email, password, date_of_birth, id],
    (error, results) => {
      if (error) {
        throw error
      } if (typeof results.rows == 'undefined') {
      	response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
      	response.status(404).send(`User not found`);
      } else {
  	 	  response.status(200).send(`User modified with ID: ${results.rows[0].id}`)         	
      }
    }
  )
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};