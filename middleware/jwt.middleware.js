const jwt = require('jsonwebtoken')

// --------------------------------
// this is a general authentication verification for all users
function isAuthenticated(req, res, next) {
	try {
		// -----------------------
		// grab token from the header request and verify
		// authenticity
		const headerAutho = req.headers.authorization

		// ----------------------
		// removing Bearer from the header
		const tokenFromHeader = headerAutho.split(' ')[1]
		// ------------------------
		// retrieving user Info from the token
		const payload = jwt.verify(tokenFromHeader, process.env.SECRET_WORD)
		// ------------------------
		// verifying if its admin user
		if (payload) {
			// req.payload = { 'Regular User': payload }
			req.payload = { 'All Users': payload }
			next()
		} else {
			// -----------------------
			// if the token is ok we can send as a resquest to the server and provide
			// protected routes
			// VVVVVVVVVVVVVVVVVVVVVV

			return res.status(403).send('Wrong place Chef. Access Denied!')
		}
	} catch (error) {
		return res.status(401).send('Token not provided or invalid!')
	}
}

// ---------------------
// this is an adimin authentication level
function isAdminAuthenticated(req, res, next) {
	try {
		// -----------------------
		// grab token from the header request and verify
		// authenticity
		const headerAutho = req.headers.authorization

		// ----------------------
		// removing Bearer from the header
		const tokenFromHeader = headerAutho.split(' ')[1]
		// ------------------------
		// retrieving user Info from the token
		const payload = jwt.verify(tokenFromHeader, process.env.SECRET_WORD)

		// ------------------------
		// verifying if its admin user
		if (payload.admin) {
			req.payload = { 'Admin user': payload }
			next()
		} else {
			// -----------------------
			// if the token is ok we can send as a resquest to the server and provide
			// protected routes
			// VVVVVVVVVVVVVVVVVVVVVV

			res.status(403).send('Access Denied!')
		}
	} catch (error) {
		return res.status(401).send('Token not provided or invalid!')
	}
}

module.exports = { isAuthenticated, isAdminAuthenticated }
