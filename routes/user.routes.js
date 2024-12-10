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
		const reqHeader = req.payload
		const currentUserId = reqHeader['All Users']._id
		// const currentUser = reqHeader['All Users']
		const updatedUser = req.body
		const findUser = await User.findByIdAndUpdate(
			currentUserId,
			updatedUser,
			{ new: true }
		).lean()
		const userNoPass = { ...findUser, password: 'Not today' }
		console.log(findUser)

		res.status(200).json({ data: userNoPass })
	} catch (error) {
		res.status(404).send('User not Found')
	}
})
users.delete('/user-delete', isAuthenticated, async (req, res) => {
	try {
		const reqHeader = req.payload
		const currentUserId = reqHeader['All Users']._id
		// const currentUser = reqHeader['All Users']

		const findUser = await User.findByIdAndDelete(currentUserId)

		res.status(200).json({ message: 'User deleted!' })
	} catch (error) {
		res.status(404).send('User not Found')
	}
})

module.exports = users
