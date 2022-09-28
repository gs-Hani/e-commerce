const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();

const { PORT } = require('./config');
app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const modules = require('./modules/index');
modules(app);

app.listen(PORT, console.log(`server listening to port:${PORT}`));