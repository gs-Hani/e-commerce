const { allProducts,searchByCategory,searchById,allCategories } = require('../services/productsService')

exports.shopPage = (req, res) => {
    try { res.send('<h1>Welcome to the shop</h1>');
    } catch (error) { return res.status(400).json({ error }); }
};

exports.products = async (req, res, next) => {
    try {
      const /*----------*/ response = await allProducts();
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

exports.categories = async (req, res, next) => {
  try {
    const /*----------*/ response = await allCategories();
    res.status(200).send(response);

  } catch (err) {
    next  (err);
  }
};
