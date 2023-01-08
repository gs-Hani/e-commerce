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
    }
};
