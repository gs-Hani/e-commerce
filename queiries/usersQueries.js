const db = require('../db')


const getUsers = (request, response) => {
  db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getUserById = async (id) => {
  const values = [id];
  const statement = `SELECT * FROM users WHERE id = $1`;

  const result = await db.query(statement, values);
  if (!result) { throw error }
  return result.rows[0];
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

const updateUser = async (data) => {
  const { id, user_name, email, password, date_of_birth } = data;
  const statement = `UPDATE users SET user_name = $1, email = $2, password = $3, date_of_birth = $4 WHERE id = $5 RETURNING *`;
  const result = await db.query(statement,[user_name, email, password, date_of_birth, id]);

  if (!result) {
    throw error
  } 
  return result.rows[0];
};

const deleteUser = async (id) => {
  const values = [id];
  const statement = `DELETE FROM users WHERE id = $1`;
  const result = await db.query(statement,values);

  return result;
};

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};