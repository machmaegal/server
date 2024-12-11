const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

router.get('/', async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json({
			message: 'all dishes here',
			users,
		});
	} catch (error) {
		res.status(404).send({ message: error });
	}
});

router.post('/', (req, res) => { });

module.exports = router;
