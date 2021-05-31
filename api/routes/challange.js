const express = require('express');
const mongoose = require('mongoose');
const {update} = require('../models/challange');
const router = express.Router();
const ChallangeMong = require('../models/challange');


router.get('/', (req, res, next) => {
    ChallangeMong.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            err: err
        });
    });
});


router.post('/', (req, res, next) => {
    const challange = new ChallangeMong({
        _id: new mongoose.Types.ObjectId(),
        kilometers: req.body.kilometers,
        date: req.body.date,
        name: req.body.name
    });
    challange
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                createdChallange: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});


module.exports = router;