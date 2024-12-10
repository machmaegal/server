const authorization = require('express').Router()
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middleware/jwt.middleware')

authorization.post('/signup', async (req, res) => {
	try {
		// grab email and password
		// ||| ----------------------
		// VVV  verify if user exists
		const { email, password } = req.body
		const foundUser = await User.findOne({ email })
		if (!foundUser) {
			// user not found, so lets create it
			// lets salt the password ans encrypt
			const salt = bcrypt.genSaltSync(12)
			const hashedPassword = bcrypt.hashSync(password, salt)
			// modifying the password to store the hashedone
			const hashedUser = { ...req.body, password: hashedPassword }
			// create a hashed user finally
			const newUser = await User.create(hashedUser)
			// send the response with the new user
			// to the frontEnd

			res.status(201).json({
				message: 'New User Created',
				data: newUser,
			})
		} else {
			return res.status(409).json({ Message: 'Resource already exists!' })
		}
	} catch (error) {
		return res.status(404).json({ message: 'not found' })
	}
})
authorization.post('/login', async (req, res) => {
	try {
		// ---------------------------------------
		// grab email and pass from the login page
		const { email, password } = req.body
		// --------------------
		// check if user exists
		const foundUser = await User.findOne({ email })
		if (!foundUser) {
			// -------------------------------------
			// user dont exist, so user not found!!!
			return res.status(404).send('User Not Found')
		} else {
			// -------------------------------------------
			// verify if password coincids with stored one
			const passIsEqual = bcrypt.compareSync(password, foundUser.password)
			// ------------
			// checking if its true
			if (passIsEqual) {
				// ---------------------
				// grab info from user to create the Token
				const { _id, name, email, admin } = foundUser
				const payload = { _id, name, email, admin }
				// ---------------------
				// creating authorization - JSON web token
				const authoToken = jwt.sign(payload, process.env.SECRET_WORD, {
					algorithm: 'HS256',
					expiresIn: '2h',
				})
				return res
					.status(200)
					.send({ message: 'token attached', authoToken })
			} else {
				return res.status(401).json({ message: 'Wrong credentials' })
			}
		}
	} catch (error) {}
})

authorization.get('/verify-user', isAuthenticated, (req, res) => {
	res.status(200).json({ 'final point': req.payload })
})

module.exports = authorization
