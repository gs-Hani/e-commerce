const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

//NODEMON==========================
const nodemon = require('nodemon');

nodemon({
  script: 'app.js',
  ext: 'js json'
});

nodemon.on('start', function () {
  console.log('App has started');
}).on('quit', function () {
  console.log('App has quit');
  process.exit();
}).on('restart', function (files) {
  console.log('App restarted due to: ', files);
});
//=============================================

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const router = require('./routes/index');
router(app);

app.listen(PORT);