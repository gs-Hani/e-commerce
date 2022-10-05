const express = require('express');
const router = express.Router();
const { display, searchByCategory, searchById } = require('../services/productsService')

module.exports = (app) => {
    app.use('/shop', router);

    router.get('/', (req, res) => {
      res.send('<h1>Welcome to the shop</h1>')
    });

    /*
    router.get('/products', async (req, res, next) => {
      try {
        
        const                response = await display();
        res.status(200).send(response);

      } catch (err) {
          next(err);
      };
    });
    */

    router.get('/products', async (req, res) => {
      try {
        const { category } = req.query;
        
        const                response = await searchByCategory(category);
        res.status(200).send(response);

      } catch (err) {
          next(err);
      };
    });

    router.get('/products/:productId',async (req, res) => {
      try {
        const                           { productId } = req.params;
        const response = await searchById(productId);
        res.status(200).send(response);
      } catch (err) {
        next(err);
      };
      });

};