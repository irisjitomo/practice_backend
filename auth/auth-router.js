const router = require('express').Router();
const users_db = require('./auth-model')

const bcrypt = require('bcryptjs')

router.post('/register', (req, res) => {
    let newUser = req.body
    const hash = bcrypt.hashSync(newUser.password, 7)
    newUser.password = hash;

    users_db.add(newUser)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(() => {
        res.status(500).json({error : "Could not complete request"})
    })
});

router.post('/login', (req, res) => {
    let { username, password} = req.body
})