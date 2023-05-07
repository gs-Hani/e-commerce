const validator = require('validator');

exports.validateUserData = async(req,res,next) => {
    try {

      const { user_name, email, date_of_birth } = req.body;
      const new_user_name = await validator.escape(user_name);
      console.log(req.body);
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
        req.body = { ...req.body, user_name: new_user_name };
        next();
      }
    } catch (error) { throw(error) };   
};

exports.validateSignIn = async(data) => {

    const { email, password } = data;
    
  //sanitization -----------------------------------
    if (!validator.isEmail(email)) {
      const err = new Error('Please insert a valid email address');
            err.status = 401;
      throw err;
    } else {
      const  valData = { email, password };
      return valData;
    }
};

exports.validateCart = async(req, res, next) => {

  const/*----------*/{ cart_id, product_id } = req.params;
  console.log('validation: data type for cart_id is...:',typeof cart_id);
  if (validator.isInt(cart_id) || cart_id != false ) {
    console.log('validation done');
    next()
  } else {
    console.log('validation failed')
    res.status(200);
    res.json({ message: "Please insert a cart Id" }); 
    };
  
};

exports.validateProduct = async(req, res, next) => {
  let numbers = 0;
  req.body.forEach(product_id => {
    if(validator.isInt(product_id)) { numbers++ }
  })
  if (numbers === req.body.length) {
    console.log('validation done');
     next() } 
  else {
    res.status(200);
    res.json({ message: "Please insert a product Id" });
  };

};

exports.validateOrder = async(req, res, next) => {

  const/*----------*/{ order_id } = req.params;
  if (!validator.isInt(order_id)) {
    res.status(200);
    res.json({ message: "Please insert an order Id" }); 
  } else { next() };

};

exports.validateUser = async(req, res, next) => {

  const/*----------*/{ user_id } = req.body;
  console.log(user_id);
  if (!validator.isInt(user_id+'')) {
    res.status(200);
    res.json({ message: "Please insert a user Id" }); 
  } else { next() };

};