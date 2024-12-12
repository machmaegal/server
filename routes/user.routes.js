const users = require('express').Router()
const User = require('../models/User.model')
const {
	isAuthenticated,
	isAdminAuthenticated,
} = require('../middleware/jwt.middleware')
// ------------------
// ADMIN gets all users
users.get('/', isAdminAuthenticated, async (req, res) => {
	try {
		const findUsers = await User.find()
		console.log(findUsers.length)

		if (findUsers.length > 0) {
			res.status(200).json({ data: findUsers })
		} else {
			res.status(404).send('No users')
		}
	} catch (error) {
		res.status(404).send('User not Found')
	}
})

// everybody do every thing
users.get('/:userId', isAuthenticated, async (req, res) => {
	try {
		const userId = req.params.userId
		const reqHeader = req.payload
		const currentUser = reqHeader['All Users']
		const userNoPass = { ...currentUser, password: 'Not today' }
		const findUser = await User.findById(userId).lean()

		if (findUser) {
			res.status(200).json({ data: userNoPass })
		} else {
			res.status(404).send('User not Found')
		}
	} catch (error) {
		res.status(404).send('User not Found')
	}
})

users.put('/:userId/user-edit', isAuthenticated, async (req, res) => {
	try {
		const userId = req.params.userId
		const reqHeader = req.payload
		const updatedUser = req.body
		const findUser = await User.findByIdAndUpdate(userId, updatedUser, {
			new: true,
		}).lean()
		const userNoPass = { ...findUser, password: 'Not today' }
		// console.log(findUser)

		res.status(200).json({ data: userNoPass })
	} catch (error) {
		res.status(404).send('User not Found')
	}
})
users.delete('/:userId/iuser-delete', isAuthenticated, async (req, res) => {
	try {
		const userId = req.params.userId
		// const reqHeader = req.payload
		// const currentUserId = reqHeader['All Users']._id
		// const currentUser = reqHeader['All Users']

		const findUser = await User.findByIdAndDelete(userId)

		res.status(200).json({ message: 'User deleted!' })
	} catch (error) {
		res.status(404).send('User not Found')
	}
})

module.exports = users
