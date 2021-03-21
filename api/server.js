const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router');
const projectRouter = require('./projects/projects-router');
// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(actionsRouter);
server.use(projectRouter);

//404 catch all very last endpoint
server.use('*', (req, res) => {
    res.status(404).json({ message: 'this is not the message' })
})

module.exports = server;