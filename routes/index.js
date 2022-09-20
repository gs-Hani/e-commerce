const express = require('express');
const router = express.Router();

module.exports = (app) => {

    app.use('/', router);

    router.get('/', (req, res) => {
        res.send('<h1>Hello from your Express.js server!!</h1>');
    });
};    




