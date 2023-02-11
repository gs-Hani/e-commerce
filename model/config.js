require('dotenv').config();
module.exports = {
    PORT:     process.env.PORT,

    SECRET:   process.env.SECRET,
    
    NODE_ENV: process.env.NODE_ENV,

    DB: {
        user:     process.env.DB_USER,
        host:     process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        dbport:   process.env.DB_PORT
    },

    FACEBOOK: {
        appId:       process.env.FACEBOOK_CONSUMER_KEY,
        secret:      process.env.FACEBOOK_CONSUMER_SECRET,
        callbackUrl: process.env.FACEBOOK_CALLBACK_URL
    }
};
