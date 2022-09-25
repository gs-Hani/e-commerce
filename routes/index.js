const general = require('./general');
const users = require('./users');
const products = require('./products');
const carts = require('./carts');
const orders = require('./orders')

module.exports = (app) => {
    general(app);
    users(app);
    products(app);
    carts(app);
    orders(app);
};    