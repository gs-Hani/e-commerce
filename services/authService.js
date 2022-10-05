const { getUserByEmail, createUser } = require('../queiries/usersQueries');
const bcrypt = require("bcrypt");

const randomNumber = () => { return Math.ceil(Math.random() * 19 )};

const passwordHash = async (password) => {
  const saltRounds = randomNumber();

  try {
    const  salt = await bcrypt.genSalt(saltRounds);
    const  hash = await bcrypt.hash(password,salt);
    return hash;

  } catch (err) {
    next  (err);
  }
  return null
};

const comparePasswords = async (password,hash) => {
  try {
    const  matchFound = await bcrypt.compare(password,hash);
    return matchFound;
    
  } catch (err) {
    next  (err);
  }
  return false;
};

async function sign_in (data) { 
  try {
    const { email, password } = data;
    const user = await getUserByEmail(email);
    
    if (!user) {
      const err = new Error('Incorrect email');
            err.status = 401;
      throw err;
    };

    if (!comparePasswords (password, user.password)) {
      const err = new Error('Incorrect password');
            err.status = 401;
      throw err;
    }
    
    return user;  

  } catch (err) {
    next  (err);
  }
  
};

async function sign_up (data) {
  try {
    const { user_name, email,       password,     date_of_birth } = data;
    const hash = await passwordHash(password);

    const newData = { user_name, email, hash, date_of_birth };

    const user = await getUserByEmail(email);

    if (user) {
      const err = new Error('Email already in use');
            err.status = 409;
      throw err;
    }
    return createUser(newData);
    
  } catch (err) {
    throw (err);
  }
  
};

async function ensureAuthentication(req) {
  if (!req.user) {
    return false;
  } return true ;
};

module.exports = {
    sign_in,
    sign_up,
    ensureAuthentication,
    passwordHash
};