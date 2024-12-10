const jwt = require('jsonwebtoken')

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
		// -----------------------
		// if the token is ok we can send as a resquest to the server and provide
		// protected routes
		// VVVVVVVVVVVVVVVVVVVVVV

		req.payload = { 'Authorized User': payload }
		next()
	} catch (error) {
		return res.status(401).send('Token not provided or invalid!')
	}
}

module.exports = { isAuthenticated }
