const general = require('./general');
const auth = require('./auth');
const shop = require('./shop');
const users = require('./users');
const products = require('./products');
const carts = require('./carts');
const orders = require('./orders');

module.exports = (app, passport) => {
    general(app);
    auth(app, passport);
    shop(app);
    users(app);
    products(app);
    carts(app);
    orders(app);
};    