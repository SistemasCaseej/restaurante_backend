const express = require('express');

const app = express();

const PORT = 8080;

app.get('/', (req, res)=>{
    res.send('servidor está rodando')
})

app.listen(PORT, ()=>{
    console.log(`servidor rodando na porta ${PORT}`)
})