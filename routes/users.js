const express = require('express');
const router  = express.Router();
const { userById, updateUser, deleteUser } = require('../controller/user');

module.exports = (app) => {

    app.use('/users', router);

    router.get   ('/:user_id', userById);
    router.put   ('/:user_id', updateUser);
    router.delete('/:user_id', deleteUser);
};

