const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
	res.json("all the food");
});

module.exports = router;
