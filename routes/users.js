const express = require('express');
const router  = express.Router();
const { userById, updateUser, deleteUser } = require('../controller/user');
const { validateUserData, validateUser } = require('../utilities/validator')

module.exports = (app) => {

    app.use('/users', router);

    router.get   ('/:user_id',                                 userById);
    router.put   ('/:user_id', validateUser,validateUserData,  updateUser);
    router.delete('/:user_id', validateUser,                   deleteUser);
};

