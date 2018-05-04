const express = require('express');

const aModel = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    aModel
        .get(id)
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res, next) => {
    const userInfo = req.body;

    aModel
        .insert(userInfo)
        .then(response => {
            aModel
                .get()
                .then(users => {
                    res.json(users);
                })
                .catch(err => {
                    res.status(500).json({ error: err });
                });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
})

router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const update = req.body;

    aModel
        .update(id, update)
        .then(response => {
            aModel.get()
                .then(users => {
                    res.json(users);
                })
                .catch(err => {
                    res.status(500).json({ error: err });
                });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    aModel
        .remove(id)
        .then(response => {
            aModel.get()
                .then(users => {
                    res.json(users);
                })
                .catch(err => {
                    res.status(500).json({ error: err });
                });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

module.exports = router;