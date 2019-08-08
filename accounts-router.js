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
        const [account] = await db('accounts').where({id});
        if (account) {
            res.status(201).json(account);
        } else {
            res.status(404).json({message:`${id} could not be found in the accounts`});
        }
    } catch (err) {
        res.status(500).json({message: "failed to get the accounts", error:err});
    }
});

router.post('/', async (req,res) => {
    const accData = req.body;

    try {
        const accounts= await db('accounts').insert(accData);
        res.status(201).json(accounts);
    } catch (err) {
        res.status(500).json({message: "cant find what your looking for"});
    }
});

router.put('/:id', async (req,res) => {
    const {id} = req.params;
    const changes = req.body;

    try {
        const count = await db('accounts').where({id}).update(changes);
        if (count) {
            res.status(200).json({updated : count});
        } else {
            res.status(404).json({message: `${id} account is not found; find it somewhere else`});
        }
    } catch (err) {
        res.status(500).json({message:" couldnt find what your looking for", error:err});
    }
});

router.delete('/:id', async (req,res) => {
    const {id} = req.params;

    try {
        const count = await db('accounts').where({id}).del();
        if (count) {
            res.status(200).json({deleted: count});
        } else {
            res.status(404).json({message: `${id} could not be found`});
        }
    } catch (err) {
        res.status(500).json({message: "could not find what your looking for", error: err });
    }
});

module.exports = router;