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
  const id = parseInt(request.params.id);
  const values = [id];
  const statement = `SELECT * FROM users WHERE id = $1`;

  db.query(statement, values, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getUserByEmail = async (email) => {
  const values = [email];
  const statement = `SELECT * FROM users WHERE email = $1`;
  
  const result = await db.query(statement, values)
    if (!result) {
      throw error
    }
  
  return result.rows[0];
};

const createUser = (data) => {
  const { user_name, email, hash, date_of_birth } = data;
  const statement = `INSERT INTO users (user_name, email, password, date_of_birth) VALUES ( $1, $2, $3, $4 ) RETURNING *`;

  const result = db.query(statement, [user_name, email, hash, date_of_birth]);

  if (!result) {
    return null
  } else if (!Array.isArray(result.rows) || result.rows.length < 1) {
    return null
  }
  return result.rows[0];
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
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};