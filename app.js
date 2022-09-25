const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { PORT } = require('./config');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const router = require('./routes/index');
router(app);

app.listen(PORT, console.log(`server listening to port:${PORT}`));