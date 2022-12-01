const { searchByCategory, searchById } = require('../services/productsService')

exports.shopPage = (req, res) => {
    try { res.send('<h1>Welcome to the shop</h1>');
    } catch (error) { return res.status(400).json({ error }); }
};

exports.products = async (req, res) => {
    try {
      const { category } = req.query;
      
      const /*----------*/ response = await searchByCategory(category);
      res.status(200).send(response);

    } catch (err) {
      next  (err);
    }
};

exports.productById = async (req, res) => {
    try {
      const                           { product_id } = req.params;
      const response = await searchById(product_id);
      res.status(200).send(response);

    } catch (err) {
      next  (err);
    }
};
