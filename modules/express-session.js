const session = require("express-session");
const { SECRET } = require('../config')

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
  })
);