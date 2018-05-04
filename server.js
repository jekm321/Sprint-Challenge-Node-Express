const projectModel = require('./data/helpers/projectModel');
const actionModel = require('./data/helpers/actionModel');

const projectRoutes = require('./routes/projectRoutes');
const actionRoutes = require('./routes/actionRoutes');

const express = require('express');
const server = express();

errorHandler = (err, req, res, next) => {
    if (err) {
        if (err.errno === 19) {
            res.status(400).json({ msg: 'Please provide all required fields' });
        } else {
            res.status(500).json({ error: 'something bad happened' });
        }
    }
}

server.use(express.json());

server.get('/', (req, res) => {
    res.json({ api: 'running' });
})

server.use('/api/projects', projectRoutes);

server.use(errorHandler);

const port = 5000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));