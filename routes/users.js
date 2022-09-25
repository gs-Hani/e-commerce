const express = require('express');
const router = express.Router();
const usersService = require('../services/usersService');

module.exports = (app) => {

    app.use('/', router);

    router.get('/users', usersService.getUsers);
    router.get('/users/:id', usersService.getUserById);
    router.post('/users', usersService.createUser);
    router.put('/users/:id', usersService.updateUser);
    router.delete('/users/:id', usersService.deleteUser);
};

