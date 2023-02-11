const { getProducts,
        getProductsBycategory, 
        getProductById,
        getCategories } = require('../model/productsQueries')

async function allProducts () {
    try {
      const foundProducts = await getProducts();
      if  (!foundProducts) {
        const err        = new Error('Oops, something went wrong!');
              err.status = 401;
        throw err;
      };
      return foundProducts;

    } catch (err) {
      throw (err)
    }
};

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

async function allCategories () {
  try {
      const categories = await getCategories();
      if  (!categories) {
          const err        = new Error('There are no categories!');
                err.status = 401;
          throw err;
        };
        return categories;

  } catch (err) {
    throw (err);
  }
};

module.exports = {
    allProducts,
    searchByCategory,
    searchById,
    allCategories
};