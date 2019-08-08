const express = require('express');

const AccountRouter = require('./AccountRouter.js');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountRouter);

server.get('/', (req,res) => {
    res.send('<h2> DB This is How We Do Accounts<h2>');
});

module.exports = server;