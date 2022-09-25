const app = require('./api');
require('dotenv').config();
const router = require('./router/router');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);

app.listen(port, () => console.log('ouvindo porta', port));
