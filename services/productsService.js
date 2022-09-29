const { getProducts, getProductById } = require('../queiries/productsQueries')

async function searchByCategory (category) {

    try {
        const foundProducts = await getProducts(category);
        if (!foundProducts) {
            console.log('No products currently in this category');
            res.sendStatus(401);
            return;
          };
          return foundProducts;

    } catch (err) {
        console.log(err);
    }
};

async function searchById (id) {
    try {
        const foundProducts = await getProductById(id);
        if (!foundProducts) {
            console.log('No products found');
            res.sendStatus(401);
            return;
          };
          return foundProducts;

    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    searchByCategory,
    searchById
};