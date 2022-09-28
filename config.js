require('dotenv').config();
module.exports = {
    PORT: process.env.PORT,

    SECRET: process.env.SECRET,
    
    DB: {
        user: process.env.user,
        host: process.env.host,
        database: process.env.database,
        password: process.env.password,
        dbport: process.env.dbport
    }
};
