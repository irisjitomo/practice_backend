const router = require('express').Router();
const users_db = require('./auth-model');
const jwt = require('jsonwebtoken')
const secret = require('./secretForToken')

const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
	let newUser = req.body;
	const hash = bcrypt.hashSync(newUser.password, 7);
	newUser.password = hash;

	users_db
		.add(newUser)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch(() => {
			res.status(500).json({ error: 'Could not complete request' });
		});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;
	users_db.findBy({ username }).first().then((login) => {
		if (login && bcrypt.compareSync(password, login.password)) {
			const token = Token(login);

			res.status(200).json({
				message: `Hello ${login.username}`,
				token
			});
		} else {
			res.status(401).json({ error: `Could not log in ${login.username}` });
		}
	});
});

function Token(user) {
    const payload = {
        username: user.username,
        password: user.password
    }
    const options = {
        expiresIn: '2 hours'
    }

    return jwt.sign(payload, secret.secret, options)
}

module.exports = router