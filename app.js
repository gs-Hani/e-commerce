const express  = require('express');
const app      = express();

const { PORT } = require('./model/config');

const modules  = require('./modules/index');
modules(app);

app.listen(PORT, console.log(`server listening to port:${PORT}`));