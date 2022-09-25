const express = require('express');

// const router = require('./router/router');
// ...
const app = express();

app.use(express.json());

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
