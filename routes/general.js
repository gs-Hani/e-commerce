const   express = require('express');
const   router  = express.Router();
const { home }  = require('../controller/general')

module.exports = (app) => {
    app.use('/', router);
    router.get('/', home);
};