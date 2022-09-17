const express = require('express');
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

app.get('/', (req, res) => {
    res.send('<h1>Hello from your Express.js server!!</h1>');
});
   
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});