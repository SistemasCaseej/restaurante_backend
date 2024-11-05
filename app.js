require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const user_routes = require('./routes/user_routes');

app.use('/', user_routes);

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL).then(function(){
    console.log("Conectado ao banco de dados");
  }).catch(function(err){
    console.log("Error to connect to mongodb:" + err);
  });

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
