const express = require('express');
const router = express.Router();
const { createUser } = require('../services/usersService');

module.exports = (app) => {

    app.use('/', router);

    router.post('/register', createUser );
};