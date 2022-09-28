const session = require("express-session");
const store = new session.MemoryStore(); // used in development only !!!
const { SECRET } = require('../config');

module.exports = (app) => {
    app.use(
        session({
          secret: SECRET,
          cookie: { maxAge: 1000 * 60 * 60 * 24, secure: true, sameSite: "none" },
          resave: false,
          saveUninitialized: false,
          store,
        })
      );
    return app;
};
