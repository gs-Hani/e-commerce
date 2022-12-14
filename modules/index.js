const express_sessionModule = require('./express-session');
const passportModule        = require('./passport');
const router                = require('../routes/index');
const swagger               = require('./swagger');

module.exports = async (app) => {
    
    const express_session = await express_sessionModule(app);
    const passport        = passportModule(express_session);

    swagger(app);

    router(app, passport);
};