const { userById, updateAccount, deleteAccount } = require('../services/usersService');
const { passwordHash } /*---------------------*/ = require('../services/authService');

exports.userById = async (req,res) => {
    try {

        const /*-------------------*/ { user_id } = req.params;
        const response = await userById(user_id);
        res.status(200).send(response);

      } catch (err) {
        next  (err);
    };
};

exports.updateUser = async (req,res,next) => {
    try {
        const { user_id }/*--------------------------------------*/= req.params;
        let   { user_name, email,        password, date_of_birth } = req.body;
        password   =  await passwordHash(password);
        const data = { user_name, email, password, date_of_birth };

        const/*------------*/response = await updateAccount({ user_id, ...data });
        res.status(200).send(response);

      } catch (err) {
        next  (err);
    }; 
};

exports.deleteUser = async (req,res) => {
    try {
        const { user_id } = req.params;

        const response = await deleteAccount(user_id);
        res.status(404).send(response);
        
      } catch (err) {
        next(err);
    };
};