require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

// Configuração do Passport
require('./config/passport')(passport);

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'segredo',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Conexão com o banco de dados MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("Conectado ao banco de dados"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB: " + err));

// Rotas
const user_routes = require('./routes/user_routes');
const item_routes = require('./routes/item_routes');
app.use('/user', user_routes);
app.use('/item', item_routes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
