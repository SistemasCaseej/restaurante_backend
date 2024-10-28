const express = require('express');
const app = express();
const port = 8080;

const routes = require('./routes');
app.use('/', routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
