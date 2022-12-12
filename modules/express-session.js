const morgan       = require('morgan');
const errorHandler = require('errorhandler');

const cors       = require('cors');
const bodyParser = require('body-parser');

const session = require("express-session");
const store   = new session.MemoryStore(); // used in development only !!!

const helmet = require('helmet');

const { SECRET, NODE_ENV } = require('../model/config');

module.exports = (app) => {

  if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(errorHandler());
  }
  
  app.use(cors());
  
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true,}));

  app.use(helmet());

  app.use(
    session({
      secret           : SECRET,
      resave           : false,
      saveUninitialized: false,
      cookie           : { maxAge: 1000 * 60 * 60 * 24, 
                           secure: NODE_ENV === 'PRODUCTION', 
                           sameSite: "none",
                           httpsOnly: true },
      store,
    })
  );

  return app;
};
