const validator = require('validator');

exports.validateUserData = async(data) => {
    try {

      const { user_name, email, password, date_of_birth } = data;
      const new_user_name = await validator.escape(user_name);

    //sanitization -----------------------------------
      if (!validator.isEmail(email)) {
        const err = new Error("Please enter a vaild email address");
              err.status = 406;
        throw err;
      } else if (!validator.isDate(date_of_birth)) { 
        const err = new Error("Please enter a vaild date of birth");
              err.status = 406;
        throw err; 
      } else {
        const  user = { user_name: new_user_name , email, password, date_of_birth };
        return user;
      }
    } catch (error) { throw(error) };   
};

exports.validateSignIn = async(req, res, next) => {

    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      const err = new Error('Please insert a valid email address');
            err.status = 401;
      throw err;
    };

    next()
};

exports.validateCart = async(req, res, next) => {

  const/*----------*/{ cart_id, product_id } = req.params;
  if (!validator.isInt(cart_id)) {
    res.status(200);
    res.json({ message: "Please insert a cart Id" }); 
  }

};

exports.validateProduct = async(req, res, next) => {

  const     { cart_id, product_id } = req.params;
  if (!validator.isInt(product_id)) {
    res.status(200);
    res.json({ message: "Please insert a product Id" }); 
  }

};

exports.validateOrder = async(req, res, next) => {

  const/*----------*/{ order_id } = req.params;
  if (!validator.isInt(order_id)) {
    res.status(200);
    res.json({ message: "Please insert an order Id" }); 
  }

};

exports.validateUser = async(req, res, next) => {

  const/*----------*/{ user_id } = req.params;
  if (!validator.isInt(user_id)) {
    res.status(200);
    res.json({ message: "Please insert a user Id" }); 
  }

};