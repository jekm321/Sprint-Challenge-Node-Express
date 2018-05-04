const express = require('express');

const aM = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    aM
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

    aM
        .insert(userInfo)
        .then(response => {
            aM
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

    aM
        .update(id, update)
        .then(response => {
            aM.get()
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

    aM
        .remove(id)
        .then(response => {
            aM.get()
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