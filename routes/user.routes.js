const users = require('express').Router()
const User = require('../models/User.model')
const { isAuthenticated } = require('../middleware/jwt.middleware')

users.get('/user', isAuthenticated, async (req, res) => {
	try {
		const reqHeader = req.payload
		const currentUserId = reqHeader['All Users']._id
		const currentUser = reqHeader['All Users']
		const userNoPass = { ...currentUser, password: 'Not today' }
		const findUser = await User.findById(currentUserId).lean()

		if (findUser) {
			res.status(200).json({ data: userNoPass })
		} else {
			res.status(404).send('User not Found')
		}
	} catch (error) {
		res.status(404).send('User not Found')
	}
})

users.put('/user-edit', isAuthenticated, async (req, res) => {
	try {
	} catch (error) {
		res.status(404).send('User not Found')
	}
})

module.exports = users
