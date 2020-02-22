const express = require('express')

// auth libraries
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('./auth/auth-router');


const server = express();

//middleware
server.use(helmet())
server.use(cors())
server.use(express.json())


server.get('/', (req, res) => {
    res.send('hello your server is workings')
})

server.get('/api/auth', authRouter)

const port = 8000;

server.listen(port, console.log(`listening on port ${port}`));