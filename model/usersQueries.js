const db = require('./index')

const getUserById = async (user_id) => {
  const values    =       [user_id];
  const statement = `SELECT * FROM users WHERE user_id = $1`;

  const  result   = await db.query(statement, values);
  if   (!result) { throw error }
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  try {
    const values       = [email];
    const statement    = `SELECT * FROM users WHERE email = $1`;
    const result       = await db.query(statement, values);

    if (result.rows?.length) {
      return result.rows[0];
    };

    return null;

  } catch (error) { throw error }
  
};

// const getUserByFacebookId = async (id)

const createUser = async (data) => {
  const { user_name, email, password, date_of_birth } = data;
  const statement = `INSERT INTO users (user_name, email, password, date_of_birth) VALUES ( $1, $2, $3, $4 ) RETURNING *`;

  const result = await db.query(statement, [user_name, email, password, date_of_birth]);
  
  if (!result) {
    return null
  } else if (!Array.isArray(result.rows) || result.rows.length < 1) {
    return null
  }
  return {message:"Welcome aboard!!", status:"200"};
};

const updateUser = async (data) => {
  const { user_id, user_name, email, password, date_of_birth } = data;
  const statement = `UPDATE users 
                     SET    user_name = $1, email = $2, password = $3, date_of_birth = $4 
                     WHERE  user_id = $5 
                     RETURNING *`;
  const result = await db.query(statement,[user_name, email, password, date_of_birth, user_id]);

  if  (!result) {
    throw error
  } 
  return result.rows[0];
};

const updateCredit         = async (data) => {
  const { cart_id, funds } = data;
  const values             = [funds, cart_id]
  const statement          = `UPDATE users SET credit = $1 WHERE user_id = $2 RETURNING * `;
  const result             = await db.query(statement,values);

  if   (!result) { throw error }
  return result.rows[0].credit;
};

const deleteUser  = async (user_id) => {
  const values    =       [user_id];
  const statement = `DELETE FROM users WHERE user_id = $1`;
  const result    = await db.query(statement,values);

  return result.rows;
};

module.exports = {
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    updateCredit,
    deleteUser
};