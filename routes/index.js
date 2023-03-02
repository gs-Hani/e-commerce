const general = require('./general');
const auth    = require('./auth');
const shop    = require('./shop');
const users   = require('./users');
const cart    = require('./cart');
const orders  = require('./orders');

module.exports = (app,passport) => {
    general      (app);
    auth         (app,passport);
    shop         (app);
    users        (app);
    cart         (app);
    orders       (app);
};    