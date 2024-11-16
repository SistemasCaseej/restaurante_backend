require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.use(cors()); 

const port = process.env.PORT || 3000;

const user_routes = require('./routes/user_routes');
const item_routes = require('./routes/item_routes');
app.use('/user', user_routes);
app.use('/item', item_routes);

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("Conectado ao banco de dados"))
  .catch((err) => console.log("Erro ao conectar ao MongoDB: " + err));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
