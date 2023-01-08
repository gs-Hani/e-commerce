const { getProductsBycategory, getProductById } = require('../model/productsQueries')

async function searchByCategory (category) {

    try {
        const foundProducts  = await getProductsBycategory(category);
        if  (!foundProducts) {
            const err        = new Error('No products currently in this category');
                  err.status = 401;
            throw err;
          };
          return foundProducts;

    } catch (err) {
      throw (err);
    }
};

async function searchById (product_id) {
    try {
        const foundProducts = await getProductById(product_id);
        if  (!foundProducts) {
            const err        = new Error('The product was not found');
                  err.status = 401;
            throw err;
          };
          return foundProducts;

    } catch (err) {
      throw (err);
    }
};

module.exports = {
    searchByCategory,
    searchById
};