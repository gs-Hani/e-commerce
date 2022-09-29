const express = require('express');
const router = express.Router();
const { searchByCategory, searchById } = require('../services/productsService')

module.exports = (app) => {
    app.use('/shop', router);

    router.get('/', (req, res) => {
      res.send('<h1>Welcome to the shop</h1>')
    });

    router.get('/products', async (req, res) => {
      try {
        const queryParams = req.query;
        const { category } = queryParams;
        
        const response = await searchByCategory(category);
        res.status(200).send(response);
      } catch (err) {
        next(err);
      };
    });

    router.get('/products/:productId',async (req, res) => {
      try {
        const { productId } = req.params;
        const response = await searchById(productId);
        res.status(200).send(response);
      } catch (err) {
        next(err);
      };
      });

};