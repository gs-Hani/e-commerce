const   express = require('express');
const   router  = express.Router();
const { home }  = require('../controller/general')

module.exports = (app) => {
    // function isAuthenticated (req, res, next) {
    //     console.log(req.session); next();
    //     // if (req.session.user) {
    //     //     // console.log(req.session.user)
    //     //     next();
    //     // }
    //     // else {
    //     //     // console.log("hello there!!");
    //     //     next('route')
    //     // }
    // }
    app.use('/', router);
    router.get('/', home);
};