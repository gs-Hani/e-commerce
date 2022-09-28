const express = require('express');
const router = express.Router();
const { ensureAuthentication } = require('../services/authService')

module.exports = (app) => {
    app.use('/', router);

    router.get('/shop', (req, res) => {
      res.send('<h1>Welcome to the shop</h1>')
    });

    router.post('/shop',ensureAuthentication, (req, res) => {
        res.render("shop", { user: req.session.user });
        res.send('<h1>Welcome to the shop</h1>')
      });

};