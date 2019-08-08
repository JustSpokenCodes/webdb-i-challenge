const express = require('express');

const db = require('./data/dbConfig.js');

const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const accounts = await db('accounts');

        res.status(200).json(accounts);
    }catch (err) {
        res.status(500).json({message: "There arent any accounts here", error:err});
    }
});

module.exports = router;