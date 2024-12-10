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
		console.log(payload)

		res.status(200).send('authenticated')
	} catch (error) {}
}

module.exports = { isAuthenticated }
