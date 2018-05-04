const express = require('express');

const pM = require('../data/helpers/projectModel');
const actionRoutes = require('./actionRoutes');

const router = express.Router();

router.get('/', (req, res, next) => {
    pM
        .get()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    pM
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

    pM
        .insert(userInfo)
        .then(response => {
            pM
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

    pM
        .update(id, update)
        .then(response => {
            pM.get()
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

    pM
        .remove(id)
        .then(response => {
            pM.get()
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

router.get('/:id/actions', (req, res, next) => {
    const { id } = req.params;

    pM
        .getProjectActions(id)
        .then(actions => {
            res.json(actions);
        })
        .catch(err => {
            res.status(500).json({ error: err});
        });
});

router.use('/:id/actions', actionRoutes);

module.exports = router;
