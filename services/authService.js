const { getUserByEmail, createUser } = require('../queiries/usersQueries');
const bcrypt = require("bcrypt");

const randomNumber = () => { return Math.ceil(Math.random() * 19 )};

const passwordHash = async (password) => {
  const saltRounds = randomNumber();
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password,salt);
    return hash;
  } catch (err) {
    console.log(err);
  }
  return null
};

const comparePasswords = async (password,hash) => {
  try {
    const matchFound = await bcrypt.compare(password,hash);
    return matchFound;
  } catch (err) {
    console.log(err);
  }
  return false;
};

async function sign_in (data) { 
  try {
    const { email, password } = data;
    const user = await getUserByEmail(email);
    
    if (!user) {
      console.log('Incorrect email');
      res.sendStatus(401);
      return;
    };

    if (!comparePasswords (password, user.password)) {
      console.log('Incorrect password');
      res.sendStatus(401);
      return;
    }
    return user;  
  } catch (err) {
    console.log(err);
  }
  
};

async function sign_up (data) {
  const { user_name, email, password, date_of_birth } = data;
  const hash = await passwordHash(password);
  console.log(hash);
  const newData = { user_name, email, hash, date_of_birth };

  try {
    const user = getUserByEmail(email);

    if (user) {
      throw createError(409, 'Email already in use');
    }
    return createUser(newData);
    
  } catch (err) {
    throw (err);
  }
  
};

function ensureAuthentication(req, res, next) {
  if (req.session.authenticated) {
    return next();
  } else {
    res.status(403).json({ msg: "You're not authorized to view this page" });
  }
}

module.exports = {
    sign_in,
    sign_up,
    ensureAuthentication
};