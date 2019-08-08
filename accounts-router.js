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

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const [accounts] = await db('accounts').where({id});
        if (accounts) {
            res.status(201).json(accounts);
        } else {
            res.status(404).json({message:`${id} could not be found in the accounts`});
        }
    } catch (err) {
        res.status(500).json({message: "failed to get the accounts", error:err});
    }
});

module.exports = router;