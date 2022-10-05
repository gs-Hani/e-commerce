const { getProducts, getProductsBycategory, getProductById } = require('../queiries/productsQueries')

async function display () {

    try {
        const products = await getProducts();
        if  (!products) {
            console.log('something went wrong');
            res.sendStatus(404);
            return;
          };
          return products;

    }        catch (err) {
        console.log(err);
    }
};

async function searchByCategory (category) {

    try {
        const foundProducts = await getProductsBycategory(category);
        if  (!foundProducts) {
            console.log('No products currently in this category');
            res.sendStatus(401);
            return;
          };
          return foundProducts;

    } catch        (err) {
        console.log(err);
    }
};

async function searchById (id) {
    try {
        const foundProducts = await getProductById(id);
        if  (!foundProducts) {
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
    display,
    searchByCategory,
    searchById
};