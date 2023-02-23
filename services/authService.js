const { getUserByEmail, createUser } = require('../model/usersQueries');
const { validateUserData } = require("../utilities/validator");
const   bcrypt    = require("bcrypt");

const randomNumber = () => { return Math.ceil(Math.random() * 19 )};

const passwordHash = async (password) => {
  const saltRounds = randomNumber();

  try {
    const  salt = await bcrypt.genSalt(saltRounds);
    const  hash = await bcrypt.hash(password,salt);
    return hash;

  } catch (err) {
    throw  err;
  }
};

const comparePasswords = /*----------*/async (password,hash) => {
  try {
    const  matchFound  = await bcrypt.compare(password,hash);
    return matchFound;
    
  } catch (err) {
    throw  err;
  }
};

async function sign_in (data) { 
  try {
    const { email, password } = data;

    const user/*-----*/= await getUserByEmail(email);

    if  (!user) {
      const err        = new Error('Email or password is incorrect');
            err.status = 401;
      throw err;
    };

    if (!comparePasswords (password, user.password)) {
      const err        = new Error('Email or password is incorrect');
            err.status = 401;
      throw err;
    }
    
    return user;  

  } catch (err) {
    throw  err;
  }
  
};

async function sign_up (data) {
  try {
    const /*------*/{ user_name, email,password, date_of_birth } = data;
    const hash    = await passwordHash(password);
    const newData = { user_name, email,password:hash, date_of_birth };
    const user    = await getUserByEmail(email);

    if (user) {
      const err = new Error('Email already in use');
            err.status = 409;
      throw err;
    }
    const valData = await validateUserData(newData);
    return/*------*/await createUser(valData);
    
  } catch (err) {
    throw  err;
  }
  
};

async function facebookLogin (profile) {
  try {

  } catch (err) {
    throw  err;
  }
};

async function ensureAuthentication (req) {
  if (!req.user) {
    return false;
  } return true ;
};

module.exports = {
    sign_in,
    sign_up,
    facebookLogin,
    ensureAuthentication,
    passwordHash
};