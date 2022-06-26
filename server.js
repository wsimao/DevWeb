require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

//fazer na hora da rota
const apiRouters = require('./src/routes/routers');

//conexao com banco de dados.
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
//promisse padrao do proprio ambiente
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error("ERRO:" + error.message);
});
const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//biblioteca do fileupload --> roda a função e retorno joga no use
server.use(fileupload());

//criar pasta public  --> tudo que estiver dentro desta pasta e possivel acessar por meio de link direto
server.use(express.static('public'));
server.use('/', apiRouters);

server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta: ${process.env.PORT}`);
    console.log(`Banco de dados conectado: ${process.env.DATABASE}`);
    console.log("==========================================================================")
});