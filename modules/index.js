const express_sessionModule = require('./express-session');
const passportModule        = require('./passport');
const router                = require('../routes/index');

module.exports = async (app) => {
    
    const express_session = await express_sessionModule(app);
    const passport        = passportModule(express_session);

    router(app, passport);
};