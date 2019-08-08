const express = require('express');

const AccRouter = require('./accounts-router.js');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccRouter);

server.get('/', (req,res) => {
    res.send('<h2> DB This is How We Do Accounts<h2>');
});

module.exports = server;