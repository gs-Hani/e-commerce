const morgan       = require('morgan');
const errorHandler = require('errorhandler');

const cors        =  require('cors');
const corsOptions = {
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  preflightContinue:true,
  optionSuccessStatus:200,
}
const bodyParser  =  require('body-parser');

const session = require("express-session");
const store   = new session.MemoryStore(); // used in development only !!!

const helmet = require('helmet');

const { SECRET, NODE_ENV } = require('../model/config');

module.exports = (app) => {

  if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(errorHandler());
  }
  
  app.use(cors(corsOptions));
  
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true,})); 

  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

  app.set('trust proxy', 1);

  app.use(
    session({
      secret           : SECRET,
      resave           : false,
      saveUninitialized: false,
      // cookie           : {
      //                      path: '/',
      //                      maxAge: 1000 * 60 * 60 * 24, 
      //                      secure: true, 
      //                      sameSite: "none",
      //                      httpOnly: NODE_ENV === 'PRODUCTION'
      //                     },
      store,
    })
  );
  
  return app;
};
