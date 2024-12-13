require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const {createDefaultAdmin} = require('./config/admin_account')

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


const port = process.env.PORT || 3000;

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

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("Conectado ao banco de dados");
    createDefaultAdmin();
  })
  .catch((err) => console.error("Erro ao conectar ao MongoDB: " + err));

const user_routes = require('./routes/auth_user_routes');
const admin_routes = require('./routes/admin_routes');
const unauth_routes = require('./routes/unauth_user_routes')
app.use('/user', user_routes);
app.use(unauth_routes)
app.use('/admin', admin_routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
